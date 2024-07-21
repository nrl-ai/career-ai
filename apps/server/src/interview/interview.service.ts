import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import OpenAI from "openai";
import { PrinterService } from "../printer/printer.service";
import { StorageService } from "../storage/storage.service";
import { CreateInterviewDto, InterviewDto, InterviewQuestionDto } from "@career-ai/dto";

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
HÌNH THỨC PHỎNG VẤN: 
"""{type}"""
\n\n\n
NỘI DUNG PHỎNG VẤN TRƯỚC ĐẤY:
"""{content}"""

Bạn hãy hỏi ứng viên lần lượt từng câu một.
Cuộc phỏng vấn sẽ khép lại khi số lượng câu hỏi trong {content} đã đủ là 15 câu, khi đó hãy nói như sau:
"""Cảm ơn bạn đã dành thời gian cho buổi phỏng vấn ngày hôm nay. Chúng tôi sẽ gửi kết quả đánh giá của buổi phỏng vấn này ngay sau đây."""
`,
  en: `You are a recruiter for the company described in the job description below:

JOB DESCRIPTION:
"""{jd}"""

Your task is to interview the candidate based on the following information, and you can ask up to 15 questions:

CANDIDATE'S CV IN JSON FORMAT:
"""{cv}"""
\n\n\n
POSITION APPLIED FOR BY THE CANDIDATE:
"""{position}"""
\n\n\n
INTERVIEW FORMAT:
"""{type}"""
\n\n\n
"PREVIOUS INTERVIEW CONTENT:
"""{content}"""
\n\n\n

The interview will conclude when the number of questions in {content} reaches 15. At that point, please say the following:
"""Thank you for taking the time for the interview today. We will send you the evaluation results of this interview shortly."""
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

export const ai_generate_interview_question = async(language: keyof CreateJDPrompt, cv: string, jd: string, position: string, type: string, content: string) => {
  const text = "Chúng tôi khi tạo câu hỏi phỏng vấn. Vui lòng thử lại.";
  const prompt = PROMPT[language].replace("{jd}", jd).replace("{cv}", cv).replace("{position}", position).replace("{type}", type).replace("{content}", content);
  const stream = await openai.chat.completions.create({
    messages: [{role: "system", content: prompt}],
    model: "gpt-3.5-turbo",
    // stream: true,
  });

  return stream.choices[0].message.content ?? text;
}

@Injectable()
export class InterviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly printerService: PrinterService,
    private readonly storageService: StorageService,
  ) {}

  async fetchAll(userId: string) {
    return this.prisma.interviews.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });
  }

  remove(id: string) {
    return this.prisma.interviews.delete({ where: { id: id } });
  }

  async create(userId: string, createInterViewDto: CreateInterviewDto) {
    return this.prisma.interviews.create({
      data: {
        userId,
        position: createInterViewDto.position,
        type: createInterViewDto.type,
        jd: createInterViewDto.jd,
        language: createInterViewDto.language,
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

  createQuestionNoStreaming(interviewQuestionDto: InterviewQuestionDto) {
    const language = interviewQuestionDto.language.toLowerCase() as keyof InterviewPrompt;
    const cv = JSON.stringify(interviewQuestionDto.cv);
    const jd = interviewQuestionDto.jd;
    const content = JSON.stringify(interviewQuestionDto.content);
    const position = interviewQuestionDto.position;
    const type = interviewQuestionDto.type;

    return ai_generate_interview_question(language, cv, jd, position, type, content);
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
