import { forwardRef, Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { StorageModule } from "../storage/storage.module";
import { JobApplicationsController } from "./job_applications.controller";
import { JobApplicationsService } from "./job_applications.service";

@Module({
  imports: [forwardRef(() => AuthModule.register()), StorageModule],
  controllers: [JobApplicationsController],
  providers: [JobApplicationsService],
  exports: [JobApplicationsService],
})
export class JobApplicationsModule {}
