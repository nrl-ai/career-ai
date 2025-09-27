import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { StorageModule } from "../storage/storage.module";
import { LLMCallService } from "./llmcall.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [HttpModule, StorageModule, UserModule],
  providers: [LLMCallService],
  exports: [LLMCallService],
})
export class LLMCallModule {}
