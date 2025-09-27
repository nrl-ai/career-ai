import { Controller, Post, Body, HttpCode, UseGuards } from "@nestjs/common";
import { VoiceService } from "./voice.service";
import { User } from "../user/decorators/user.decorator";
import { UserDto } from "@career-ai/dto";
import { JwtGuard } from "../auth/guards/jwt.guard";
import { OptionalJwtGuard } from "../auth/guards/optional-jwt.guard";

@Controller("voice")
export class VoiceController {
  constructor(private readonly voiceService: VoiceService) {}

  /**
   * Generate mock timepoints for Google TTS API compatibility
   * This creates timing markers for each word to support TalkingHead library
   */
  private generateTimepoints(text: string): Array<{ markName: string; timeSeconds: number }> {
    const words = text.split(/\s+/).filter((word) => word.length > 0);
    const timepoints: Array<{ markName: string; timeSeconds: number }> = [];

    // Estimate timing: roughly 150ms per word + 50ms pause
    let currentTime = 0;

    words.forEach((word, index) => {
      timepoints.push({
        markName: index.toString(),
        timeSeconds: currentTime,
      });

      // Estimate word duration based on length (roughly 100ms per character + base 50ms)
      const wordDuration = Math.max(0.15, word.length * 0.1);
      currentTime += wordDuration + 0.05; // Add 50ms pause between words
    });

    return timepoints;
  }

  @Post("text-to-speech")
  @UseGuards(OptionalJwtGuard)
  @HttpCode(200)
  async textToSpeech(@Body() body: any, @User() user?: UserDto) {
    // Support both simple format and Google TTS format for backward compatibility
    let text: string;
    let voice = "alloy";

    if (body.text) {
      // Simple format: { text: "...", voice: "..." }
      text = body.text;
      voice = body.voice || "alloy";
    } else if (body.input?.text) {
      // Google TTS format: { input: { text: "..." }, voice: { ... } }
      text = body.input.text;
      voice = "alloy"; // Default voice for Google TTS format
    } else if (body.input?.ssml) {
      // SSML format: { input: { ssml: "..." }, voice: { ... } }
      // Extract text from SSML by removing tags
      const ssmlText = body.input.ssml;
      text = ssmlText.replace(/<[^>]*>/g, "").trim();
      voice = "alloy"; // Default voice for SSML format
    } else {
      throw new Error("Text parameter is required. Use either 'text' field or 'input.text' field.");
    }

    if (!text || text.trim().length === 0) {
      throw new Error("Text content cannot be empty");
    }

    try {
      const audioBuffer = await this.voiceService.textToAudioElevenLabs(text, voice, user?.id);

      // Return format fully compatible with Google TTS API for TalkingHead library
      const response = {
        audioContent: audioBuffer.toString("base64"),
        audio: audioBuffer.toString("base64"), // Keep both for compatibility
        format: "mp3",
        // Add timepoints array for TalkingHead library compatibility
        timepoints: this.generateTimepoints(text),
        // Add other Google TTS compatible fields
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: 1.0,
          pitch: 0.0,
          volumeGainDb: 0.0,
        },
      };

      return response;
    } catch (error) {
      console.error("TTS failed:", error.message);
      throw error;
    }
  }

  @Post("text-to-speech-elevenlabs")
  @UseGuards(OptionalJwtGuard)
  @HttpCode(200)
  async textToSpeechElevenLabs(@Body() body: any, @User() user?: UserDto) {
    // Support both simple format and Google TTS format for backward compatibility
    let text: string;
    let voice = "alloy";

    if (body.text) {
      // Simple format: { text: "...", voice: "..." }
      text = body.text;
      voice = body.voice || "alloy";
    } else if (body.input?.text) {
      // Google TTS format: { input: { text: "..." }, voice: { ... } }
      text = body.input.text;
      voice = "alloy"; // Default voice for Google TTS format
    } else if (body.input?.ssml) {
      // SSML format: { input: { ssml: "..." }, voice: { ... } }
      // Extract text from SSML by removing tags
      const ssmlText = body.input.ssml;
      text = ssmlText.replace(/<[^>]*>/g, "").trim();
      voice = "alloy"; // Default voice for SSML format
    } else {
      throw new Error("Text parameter is required. Use either 'text' field or 'input.text' field.");
    }

    if (!text || text.trim().length === 0) {
      throw new Error("Text content cannot be empty");
    }

    try {
      const audioBuffer = await this.voiceService.textToAudioElevenLabs(text, voice, user?.id);

      // Return format fully compatible with Google TTS API for TalkingHead library
      const response = {
        audioContent: audioBuffer.toString("base64"),
        audio: audioBuffer.toString("base64"), // Keep both for compatibility
        format: "mp3",
        // Add timepoints array for TalkingHead library compatibility
        timepoints: this.generateTimepoints(text),
        // Add other Google TTS compatible fields
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: 1.0,
          pitch: 0.0,
          volumeGainDb: 0.0,
        },
      };

      return response;
    } catch (error) {
      console.error("ElevenLabs TTS error:", error);
      throw error;
    }
  }

  @Post("speech-to-text")
  @UseGuards(OptionalJwtGuard)
  async speechToText(@Body() body: any, @User() user?: UserDto) {
    const { audio } = body;
    const text = await this.voiceService.transcribeAudioSmart(audio, user?.id);
    return { text };
  }

  @Post("speech-to-text-whisper")
  @UseGuards(JwtGuard)
  async speechToTextWhisper(@Body() body: any, @User() user: UserDto) {
    const { audio } = body;
    try {
      const text = await this.voiceService.transcribeWithWhisper(audio, user.id);
      return { text };
    } catch (error) {
      console.error("Whisper transcription failed:", error.message);
      throw error;
    }
  }
}
