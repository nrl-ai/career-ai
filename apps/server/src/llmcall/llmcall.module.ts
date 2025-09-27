import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { StorageModule } from "../storage/storage.module";
import { LLMCallService } from "./llmcall.service";
import { UserModule } from "../user/user.module";
import { AISettingsModule } from "../ai-settings/ai-settings.module";

@Module({
  imports: [HttpModule, StorageModule, UserModule, AISettingsModule],
  providers: [LLMCallService],
  exports: [LLMCallService],
})
export class LLMCallModule {}
