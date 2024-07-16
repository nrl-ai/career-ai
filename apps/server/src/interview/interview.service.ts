import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import OpenAI from "openai";
import { PrinterService } from "../printer/printer.service";
import { StorageService } from "../storage/storage.service";
import { CreateInterviewDto, InterviewDto } from "@career-ai/dto";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

type InterviewPrompt = {
  vn: string;
  en: string;
};

const PROMPT: InterviewPrompt = {
  vn: `Bạn là một nhà tuyển dụng của công ty được ghi trong phần mô tả công việc dưới đây:

NỘI DUNG MÔ TẢ CÔNG VIỆC:
"""{jd}"""

Nhiệm vụ của bạn là phỏng vấn ứng viên dựa trên những thông tin sau:

CV CỦA ỨNG VIÊN DẠNG JSON:
"""{cv}"""
\n\n\n
VỊ TRÍ ỨNG TUYỂN CỦA ỨNG VIÊN:
"""{position}"""
\n\n\n
CẤP BẬC CỦA ỨNG VIÊN:
"""{level}"""
\n\n\n
SỐ NĂM KINH NGHIỆM CỦA ỨNG VIÊN:
"""{yearOfExp}"""
\n\n\n
HÌNH THỨC PHỎNG VẤN: 
"""{type}"""
\n\n\n
`,
  en: `You are a recruiter for the company described in the job description below:

JOB DESCRIPTION:
"""{jd}"""

Your task is to interview the candidate based on the following information:

CANDIDATE'S CV IN JSON FORMAT:
"""{cv}"""
\n\n\n
POSITION APPLIED FOR BY THE CANDIDATE:
"""{position}"""
\n\n\n
CANDIDATE'S LEVEL:
"""{level}"""
\n\n\n
CANDIDATE'S YEARS OF EXPERIENCE:
"""{yearOfExp}"""
\n\n\n
INTERVIEW FORMAT:
"""{type}"""
\n\n\n
`,
};

type CreateJDPrompt = {
  vn: string;
  en: string;
};

const CREATEJDPROMPT: CreateJDPrompt = {
  vn: `
Bạn là một nhà tuyển dụng của một công ty bất kỳ (bạn có thể tự do lựa chọn), hãy giới thiệu về công ty của bạn (ví dụ:
tên công ty, lĩnh vực mà công ty bạn đang làm, vị trí của công ty), những lợi ích
mà công việc này đem lại, rồi dựa vào các điều kiện sau để tạo ra phần mô tả công việc:

VỊ TRÍ ỨNG TUYỂN CỦA ỨNG VIÊN:
"""{position}"""

####
LƯU Ý : BẠN CHỈ TRẢ VỀ PHẦN MÔ TẢ CÔNG VIỆC
####
`,
  en: `
You are a recruiter for any company (you may choose freely), please introduce your company 
(e.g., company name, the industry your company operates in, company location), 
the benefits this job brings, then use the following conditions to create a job description:

POSITION THE CANDIDATE IS APPLYING FOR:
""" {position} """

####
ONLY RETURN THE JOB DESCRIPTION
####
`,
};

export const ai_createJd = async (language: keyof CreateJDPrompt, position: string) => {
  const text = "Chúng tôi gặp lỗi tạo JD. Vui lòng thử lại.";
  const prompt = CREATEJDPROMPT[language].replace("{position}", position);
  const result = await openai.chat.completions.create({
    messages: [{ role: "system", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  return result.choices[0].message.content ?? text;
};

@Injectable()
export class InterviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly printerService: PrinterService,
    private readonly storageService: StorageService,
  ) {}

  findInterviewPerPage(userId: string, start: number, end: number) {
    var start_number: number = +start;
    var end_number: number = +end;
    return this.prisma.interviews.findMany({
      where: { id: userId },
      select: { position: true, type: true, createdAt: true, totalScore: true},
      orderBy: { createdAt: "desc" },
      skip: start_number,
      take: end_number,
    });
  }

  remove(id: string) {
    return this.prisma.interviews.delete({ where: { id: id } });
  }

  create(userId: string, createInterViewDto: CreateInterviewDto) {
    debugger
    return this.prisma.interviews.create({
      data: {
        userId,
        position: createInterViewDto.position,
        language: createInterViewDto.language,
        type: createInterViewDto.type,
        jd: createInterViewDto.jd,
        cv: createInterViewDto.cv,
      },
    });
  }

  createJd(position: string, language: string) {
    if (!["vn", "en"].includes(language.toLowerCase())) {
      language = "en";
    }
    return ai_createJd(language.toLowerCase() as keyof CreateJDPrompt, position);
  }
  // async create(userId: string, createResumeDto: CreateInterviewDto) {
  //     const { name, email, picture } = await this.prisma.user.findUniqueOrThrow({
  //       where: { id: userId },
  //       select: { name: true, email: true, picture: true },
  //     });

  //     const data = deepmerge(defaultResumeData, {
  //       basics: { name, email, picture: { url: picture ?? "" } },
  //     } satisfies DeepPartial<ResumeData>);

  //     return this.prisma.interviews.create({
  //       data: {
  //         data,
  //         userId,
  //         title: createResumeDto.title,
  //         visibility: createResumeDto.visibility,
  //         slug: createResumeDto.slug ?? kebabCase(createResumeDto.title),
  //       },
  //     });
  //   }
}
