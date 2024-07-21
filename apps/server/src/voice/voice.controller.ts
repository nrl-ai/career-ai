import { Controller, Post, Body } from "@nestjs/common";
import { VoiceService } from "./voice.service";

@Controller("voice")
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Post("text-to-speech")
  async textToSpeech(@Body() body: any) {
    return this.voiceService.textToAudioGTTS(body);
  }

  @Post("speech-to-text")
  async speechToText(@Body() body: any) {
    const { audio } = body;
    return {
      text: await this.voiceService.transcribeAudio(audio),
    };
  }
}
