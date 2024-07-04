import { Controller, Param, UseGuards, Get, Delete, Patch, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InterviewsService } from "./interview.service";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";
import { User as UserEntity } from "@prisma/client";

@ApiTags("Interview")
@Controller("interview")
export class InterviewsController {
    constructor(private readonly interviewsService: InterviewsService) {}

    @Get(":start/:end")
    // @Get()
    @UseGuards(TwoFactorGuard)
    // Find list of interview per page
    findInterviewPerPage(@User() user: UserEntity, @Param("start") start: number, @Param("end") end: number) {
        return this.interviewsService.findInterviewPerPage(user.id, start, end);
    }

    @Delete(":id")
    @UseGuards(TwoFactorGuard)
    // Remove interview
    remove(@Param("id") id: string) {
      return this.interviewsService.remove(id);
    }

    // @Patch(":id/retake")
    // // Retake interview
    // @UseGuards(TwoFactorGuard)
    // retakeInterview(@)
}
