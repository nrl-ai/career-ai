import { Controller, Post, Body } from "@nestjs/common";
import { VoiceService } from "./voice.service";

@Controller("voice")
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  @Post("text-to-speech")
  async textToSpeech(@Body() body: any) {
    const { text, voice } = body;
    return this.voiceService.textToAudio(text, voice);
  }

  @Post("speech-to-text")
  async speechToText(@Body() body: any) {
    const { audio } = body;
    return this.voiceService.speechToText(audio);
  }
}
