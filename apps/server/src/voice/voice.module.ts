import { Module } from '@nestjs/common';
import { VoiceService } from './voice.service';
import { VoiceController } from './voice.controller';

@Module({
  providers: [VoiceService],
  controllers: [VoiceController]
})
export class VoiceModule {}
