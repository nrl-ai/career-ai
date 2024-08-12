import { Module } from "@nestjs/common";

import { AuthModule } from "@/server/auth/auth.module";
import { PrinterModule } from "@/server/printer/printer.module";

import { StorageModule } from "../storage/storage.module";
import { LLMController } from "./llm.controller";
import { LLMService } from "./llm.service";
import { LLMCallModule } from "../llmcall/llmcall.module";

@Module({
  imports: [AuthModule, PrinterModule, StorageModule, LLMCallModule],
  controllers: [LLMController],
  providers: [LLMService],
  exports: [LLMService],
})
export class LLMModule {}