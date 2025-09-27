import {
  Controller,
  Param,
  UseGuards,
  Get,
  Delete,
  Patch,
  Post,
  Body,
  BadRequestException,
  Logger,
  InternalServerErrorException,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InterviewsService } from "./interview.service";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";
import { User as UserEntity } from "@prisma/client";
import { CreateInterviewDto } from "@career-ai/dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ErrorMessage } from "@career-ai/utils";

@ApiTags("Interview")
@Controller("interview")
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Get("/findAll")
  // @Get()
  @UseGuards(TwoFactorGuard)
  // Find list of interview per page
  findAll(@User() user: UserEntity) {
    return this.interviewsService.fetchAll(user.id);
  }

  @Post()
  @UseGuards(TwoFactorGuard)
  async create(@User() user: UserEntity, @Body() createInterviewDto: CreateInterviewDto) {
    try {
      return await this.interviewsService.create(user.id, createInterviewDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException(ErrorMessage.ResumeSlugAlreadyExists);
      }

      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(":id")
  @UseGuards(TwoFactorGuard)
  // Remove interview
  remove(@Param("id") id: string) {
    return this.interviewsService.remove(id);
  }

  @Post("/createJd")
  @UseGuards(TwoFactorGuard)
  ai_createJd(@User("numRequestsToday") numRequestsToday: number, @Body("position") position: string, @Body("language") language: string) {

    if (numRequestsToday <= 0) {
      return -1;
    }

    return this.interviewsService.createJd(position, language);
  }

  @Post("/create-interview-answer")
  @UseGuards(TwoFactorGuard)
  ai_createInterviewAnswer(@User("numRequestsToday") numRequestsToday: number, @User() user: UserEntity, @Body() data: any) {
    const interviewId = data.interviewId;
    const cvId = data.cvId;
    const messages = data.messages;
    const forceFinish = data.forceFinish;
    const interviewer = data.interviewer;

    if (numRequestsToday <= 0) {
      return -1;
    }

    return this.interviewsService.generateInterviewAnswer(user, interviewId, messages, forceFinish, cvId, interviewer);
  }

}
