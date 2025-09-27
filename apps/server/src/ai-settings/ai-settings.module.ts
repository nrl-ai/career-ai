import { Module } from "@nestjs/common";

import { AISettingsController } from "./ai-settings.controller";
import { AISettingsService } from "./ai-settings.service";

@Module({
  controllers: [AISettingsController],
  providers: [AISettingsService],
  exports: [AISettingsService],
})
export class AISettingsModule {}
