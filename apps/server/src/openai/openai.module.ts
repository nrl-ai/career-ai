import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
   
import { StorageModule } from "../storage/storage.module";
import { OpenAIService } from "./openai.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [HttpModule, StorageModule, UserModule],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
