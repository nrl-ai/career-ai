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
            where: {id: userId},
            select: {position: true, type: true, createdAt: true, score: true},
            orderBy: {createdAt: "desc"},
            skip: start_number,
            take: end_number,
        });
    }

    remove(id: string) {
        return this.prisma.interviews.delete({where: {id: id}});
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