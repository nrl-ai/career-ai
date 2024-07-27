import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { VoiceService } from "./voice.service";

@Controller("voice")
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Post("text-to-speech")
  @HttpCode(200)
  async textToSpeech(@Body() body: any) {
    const data = this.voiceService.textToAudioGTTS(body);
    // Return with HTTP response code 200
    return data;
  }

  @Post("speech-to-text")
  async speechToText(@Body() body: any) {
    const { audio } = body;
    return {
      text: await this.voiceService.transcribeAudio(audio),
    };
  }
}
