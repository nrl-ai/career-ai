import { Module } from "@nestjs/common";
import { VoiceService } from "./voice.service";
import { VoiceController } from "./voice.controller";
import { AISettingsModule } from "../ai-settings/ai-settings.module";

@Module({
  imports: [AISettingsModule],
  providers: [VoiceService],
  controllers: [VoiceController],
})
export class VoiceModule {}
