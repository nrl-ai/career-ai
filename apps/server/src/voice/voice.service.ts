import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import * as fs from "fs";
import * as os from "os";
import path from "path";
import { AISettingsService } from "../ai-settings/ai-settings.service";

@Injectable()
export class VoiceService {
  constructor(private readonly aiSettingsService: AISettingsService) {}

  async textToAudioElevenLabs(
    text: string,
    voice: string = "alloy",
    userId?: string,
  ): Promise<Buffer> {
    try {
      // Validate input
      if (!text || text.trim().length === 0) {
        throw new Error("Text is required for text-to-speech conversion");
      }

      // Get user's ElevenLabs API key
      let elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;

      if (userId) {
        const userSettings = await this.aiSettingsService.findByUserId(userId);
        if (userSettings && userSettings.elevenLabsApiKey) {
          elevenLabsApiKey = userSettings.elevenLabsApiKey;
        }
      }

      if (!elevenLabsApiKey) {
        throw new Error("No ElevenLabs API key available");
      }

      // Map voice names to ElevenLabs voice IDs with proper gender mapping
      let voiceId = this.getElevenLabsVoiceId(voice);

      // Generate speech using ElevenLabs REST API (updated to current API)
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
      const requestBody = {
        text: text.trim(),
        model_id: "eleven_multilingual_v2", // Updated to current default model
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
        output_format: "mp3_44100_128", // Explicitly specify output format
      };

      console.log("ElevenLabs TTS request:", {
        textLength: text.length,
        voiceId,
        hasApiKey: !!elevenLabsApiKey,
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": elevenLabsApiKey,
          "User-Agent": "CareerAI/1.0",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `ElevenLabs API error: ${response.status} ${response.statusText} - ${errorText}`,
        );
      }

      // Convert response to buffer
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = Buffer.from(arrayBuffer);
      return audioBuffer;
    } catch (error) {
      console.error("ElevenLabs TTS error:", error);
      throw new Error(`ElevenLabs TTS failed: ${error.message}`);
    }
  }

  async transcribeWithWhisper(base64Audio: string, userId?: string): Promise<string> {
    try {
      // Get user's LLM settings for API key and base URL
      let apiKey = process.env.LLM_API_KEY;
      let baseURL = process.env.LLM_BASE_URL || "https://api.openai.com/v1";

      if (userId) {
        const userSettings = await this.aiSettingsService.findByUserId(userId);
        if (userSettings && userSettings.llmApiKey) {
          apiKey = userSettings.llmApiKey;
          baseURL = userSettings.llmBaseUrl;
        }
      }

      if (!apiKey) {
        throw new Error("No API key available for Whisper transcription");
      }

      // Initialize OpenAI client
      const openai = new OpenAI({
        apiKey,
        baseURL,
      });

      // Convert base64 to buffer
      const audioData = base64Audio.split("base64,")[1];
      const audioBuffer = Buffer.from(audioData, "base64");

      // Create a temporary file
      const tempDir = os.tmpdir();
      const fileName = `whisper_audio_${Date.now()}.wav`;
      const filePath = path.join(tempDir, fileName);

      // Write buffer to temporary file
      fs.writeFileSync(filePath, new Uint8Array(audioBuffer));

      // Create a readable stream for OpenAI API
      const audioFile = fs.createReadStream(filePath);

      // Call Whisper API
      const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: "whisper-1",
        language: "en", // You can make this configurable
        response_format: "text",
      });

      // Clean up temporary file
      fs.unlinkSync(filePath);

      return transcription;
    } catch (error) {
      console.error("Whisper transcription error:", error);
      throw new Error(`Whisper transcription failed: ${error.message}`);
    }
  }

  async transcribeAudioSmart(base64Audio: string, userId?: string): Promise<string> {
    // Try Whisper first if user is provided and has API key configured
    if (userId) {
      try {
        const userSettings = await this.aiSettingsService.findByUserId(userId);
        if (userSettings && userSettings.llmApiKey) {
          return await this.transcribeWithWhisper(base64Audio, userId);
        }
      } catch (error) {
        console.warn("Whisper transcription failed, falling back to legacy method:", error);
      }
    }

    // No fallback transcription methods available
    throw new Error("No transcription service configured. Please configure Whisper API.");
  }

  /**
   * Map voice names to appropriate ElevenLabs voice IDs based on gender and character
   */
  private getElevenLabsVoiceId(voice: string): string {
    // Handle Google TTS voice names (used by TalkingHead component)
    if (voice === "en-US-Standard-A") {
      // Andrew (male CEO) - use a professional male voice
      return "pNInz6obpgDQGcFmaJgB"; // Adam - Deep male voice
    }

    if (voice === "en-US-Standard-C") {
      // Lily (female HR Manager) - use a professional female voice
      return "21m00Tcm4TlvDq8ikWAM"; // Rachel - Professional female voice
    }

    // Handle OpenAI-style voice names with better gender mapping
    const voiceMap: { [key: string]: string } = {
      // Male voices
      alloy: "pNInz6obpgDQGcFmaJgB", // Adam - Professional male
      brandon: "VR6AewLTigWG4xSOukaG", // Arnold - Deep male
      onyx: "29vD33N1CtxCmqQRPOHJ", // Drew - Mature male

      // Female voices
      nova: "21m00Tcm4TlvDq8ikWAM", // Rachel - Professional female
      jenny: "EXAVITQu4vr4xnSDxMaL", // Sarah - Young female
      susan: "AZnzlk1XvdvUeBnXmlld", // Domi - Confident female
      shimmer: "MF3mGyEYCl7XYWbV9V6O", // Elli - Expressive female
    };

    return voiceMap[voice] || "21m00Tcm4TlvDq8ikWAM"; // Default: Rachel
  }
}
