import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateResumeDto, ImportResumeDto, ResumeDto, UpdateResumeDto } from "@career-ai/dto";
import { defaultResumeData, ResumeData } from "@career-ai/schema";
import type { DeepPartial } from "@career-ai/utils";
import { ErrorMessage, generateRandomName, kebabCase } from "@career-ai/utils";
import deepmerge from "deepmerge";
import { PrismaService } from "nestjs-prisma";
import { PrinterService } from "@/server/printer/printer.service";
import { StorageService } from "../storage/storage.service";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

type CVReviewPrompt = {
  vi: string;
  en: string;
};

const PROMPT: CVReviewPrompt = {
  vi: `Bạn là một chuyên gia tuyển dụng và tư vấn việc làm. Hãy giúp nhận xét CV sau đây và đề xuất cách tối ưu hóa CV này để phù hợp với công việc.

NỘI DUNG CV DẠNG JSON:
"""{cv}"""

NỘI DUNG MÔ TẢ CÔNG VIỆC:
"""{jd}"""

Kết quả trả về nên có dạng Markdown (thay Score bằng điểm số từ 0 đến 10, ví dụ 7.5/10). Điểm số đánh giá toàn diện về kinh nghiệm CV, mức độ phù hợp với công việc, cách trình bày, và các yếu tố khác. Sử dụng hoàn toàn Tiếng Việt trong bài viết.

**I. ĐIỂM SỐ:** <Score>/10
\n\n\n
**II. NHẬN XÉT:** ...
\n\n\n
**III. ĐIỂM MẠNH:** ...
\n\n\n
**IV. ĐIỂM YẾU:** ...
\n\n\n
**V. GỢI Ý TỐI ƯU:** ...
`,
  en: `You are a recruitment expert and career advisor. Please help review the following CV and suggest ways to optimize it to fit the job.

CV CONTENT IN JSON FORMAT:
"""{cv}"""

JOB DESCRIPTION CONTENT:
"""{jd}"""

The result should be in Markdown format (replace Score with a score from 0 to 10, e.g., 7.5/10). The score should comprehensively evaluate the CV's experience, job fit, presentation, and other factors. Use English entirely in the write-up.

**I. SCORE:** <Score>/10
\n\n\n
**II. COMMENTS:** ...
\n\n\n
**III. STRENGTHS:** ...
\n\n\n
**IV. WEAKNESSES:** ...
\n\n\n
**V. OPTIMIZATION SUGGESTIONS:** ...
`,
};

export const queryCVAnalyze = async (language: keyof CVReviewPrompt, cv: string, jd: string) => {
  const text = "Chúng tôi gặp lỗi khi phân tích CV của bạn. Vui lòng thử lại.";
  const prompt = PROMPT[language].replace("{cv}", cv).replace("{jd}", jd);
  const result = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gemini-pro",
  });
  return result.choices[0].message.content ?? text;
};

@Injectable()
export class ResumeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly printerService: PrinterService,
    private readonly storageService: StorageService,
  ) {}

  async create(userId: string, createResumeDto: CreateResumeDto) {
    const { name, email, picture } = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { name: true, email: true, picture: true },
    });

    const data = deepmerge(defaultResumeData, {
      basics: { name, email, picture: { url: picture ?? "" } },
    } satisfies DeepPartial<ResumeData>);

    return this.prisma.resume.create({
      data: {
        data,
        userId,
        title: createResumeDto.title,
        visibility: createResumeDto.visibility,
        slug: createResumeDto.slug ?? kebabCase(createResumeDto.title),
      },
    });
  }

  import(userId: string, importResumeDto: ImportResumeDto) {
    const randomTitle = generateRandomName();

    return this.prisma.resume.create({
      data: {
        userId,
        visibility: "private",
        data: importResumeDto.data,
        title: importResumeDto.title ?? randomTitle,
        slug: importResumeDto.slug ?? kebabCase(randomTitle),
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.resume.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  }

  findOne(id: string, userId?: string) {
    if (userId) {
      return this.prisma.resume.findUniqueOrThrow({ where: { userId_id: { userId, id } } });
    }

    return this.prisma.resume.findUniqueOrThrow({ where: { id } });
  }

  async findOneStatistics(id: string) {
    const result = await this.prisma.statistics.findFirst({
      select: { views: true, downloads: true },
      where: { resumeId: id },
    });

    return {
      views: result?.views ?? 0,
      downloads: result?.downloads ?? 0,
    };
  }

  async findOneByUsernameSlug(username: string, slug: string, userId?: string) {
    const resume = await this.prisma.resume.findFirstOrThrow({
      where: { user: { username }, slug, visibility: "public" },
    });

    // Update statistics: increment the number of views by 1
    if (!userId) {
      await this.prisma.statistics.upsert({
        where: { resumeId: resume.id },
        create: { views: 1, downloads: 0, resumeId: resume.id },
        update: { views: { increment: 1 } },
      });
    }

    return resume;
  }

  async update(userId: string, id: string, updateResumeDto: UpdateResumeDto) {
    try {
      const { locked } = await this.prisma.resume.findUniqueOrThrow({
        where: { id },
        select: { locked: true },
      });

      if (locked) throw new BadRequestException(ErrorMessage.ResumeLocked);

      return await this.prisma.resume.update({
        data: {
          title: updateResumeDto.title,
          slug: updateResumeDto.slug,
          visibility: updateResumeDto.visibility,
          data: updateResumeDto.data as unknown as Prisma.JsonObject,
        },
        where: { userId_id: { userId, id } },
      });
    } catch (error) {
      if (error.code === "P2025") {
        Logger.error(error);
        throw new InternalServerErrorException(error);
      }
    }
  }

  lock(userId: string, id: string, set: boolean) {
    return this.prisma.resume.update({
      data: { locked: set },
      where: { userId_id: { userId, id } },
    });
  }

  async remove(userId: string, id: string) {
    await Promise.all([
      // Remove files in storage, and their cached keys
      this.storageService.deleteObject(userId, "resumes", id),
      this.storageService.deleteObject(userId, "previews", id),
    ]);

    return this.prisma.resume.delete({ where: { userId_id: { userId, id } } });
  }

  async printResume(resume: ResumeDto, userId?: string) {
    const url = await this.printerService.printResume(resume);

    // Update statistics: increment the number of downloads by 1
    if (!userId) {
      await this.prisma.statistics.upsert({
        where: { resumeId: resume.id },
        create: { views: 0, downloads: 1, resumeId: resume.id },
        update: { downloads: { increment: 1 } },
      });
    }

    return url;
  }

  printPreview(resume: ResumeDto) {
    return this.printerService.printPreview(resume);
  }

  analyze(userId: string, resume: ResumeDto, analyzeResumeDto: any) {
    let language = analyzeResumeDto?.language || "en";
    if (!["vi", "en"].includes(language)) {
      language = "en";
    }
    const cv = JSON.stringify(resume.data);
    const jd = analyzeResumeDto?.jd || "";
    return queryCVAnalyze(language as keyof CVReviewPrompt, cv, jd);
  }
}
