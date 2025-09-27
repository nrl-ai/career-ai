import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserDto } from "@career-ai/dto";

import { AuthService } from "../auth/auth.service";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "./decorators/job_applications.decorator";
import { JobApplicationsService } from "./job_applications.service";

@ApiTags("Job Applications")
@Controller("job_applications")
export class JobApplicationsController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: JobApplicationsService,
  ) {}

  @Get()
  @UseGuards(TwoFactorGuard)
  fetch(@User() user: UserDto) {
    return user.jobApplications;
  }

  @Patch()
  @UseGuards(TwoFactorGuard)
  async update(@User() user: UserDto, @Body() updateJobApplicationDto: any) {
    try {
      return await this.userService.updateByEmail(user.email, {
        jobApplications: updateJobApplicationDto,
      });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
