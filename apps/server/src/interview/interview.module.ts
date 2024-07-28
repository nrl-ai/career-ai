import { Module } from "@nestjs/common";

import { AuthModule } from "@/server/auth/auth.module";
import { PrinterModule } from "@/server/printer/printer.module";

import { StorageModule } from "../storage/storage.module";
import { InterviewsController } from "./interview.controller";
import { InterviewsService } from "./interview.service";
import { ResumeModule } from "../resume/resume.module";

@Module({
  imports: [AuthModule, PrinterModule, StorageModule, ResumeModule],
  controllers: [InterviewsController],
  providers: [InterviewsService],
  exports: [InterviewsService],
})
export class InterviewsModule {}
