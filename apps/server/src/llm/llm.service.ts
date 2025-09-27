import { t } from "@lingui/macro";
import { Injectable } from "@nestjs/common";
import { LLMCallService } from "../llmcall/llmcall.service";

const FIX_GRAMMAR_PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
Do not return anything else except the text you improved. It should not begin with a newline. It should not have any prefix or suffix text.
Just fix the spelling and grammar of the following paragraph, do not change the meaning and returns in the language of the text:

Text: """{input}"""

Revised Text: """`;

const IMPROVE_WRITING_PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
Do not return anything else except the text you improved. It should not begin with a newline. It should not have any prefix or suffix text.
Improve the writing of the following paragraph and returns in the language of the text:

Text: """{input}"""

Revised Text: """`;

// region Change tone

const CHANGE_TONE_PROMPT = `You are an AI writing assistant specialized in writing copy for resumes.
Do not return anything else except the text you improved. It should not begin with a newline. It should not have any prefix or suffix text.
Change the tone of the following paragraph to be {mood} and returns in the language of the text:

Text: """{input}"""

Revised Text: """`;

type Mood = "casual" | "professional" | "confident" | "friendly";

// endreigion

@Injectable()
export class LLMService {
  constructor(private readonly openai: LLMCallService) {}

  // region Improve writing
  async improveWriting(text: string, userId: string) {
    const model = await this.openai.getModelForUser(userId);
    const prompt = IMPROVE_WRITING_PROMPT.replace("{input}", text);
    const content = {
      messages: [{ role: "user", content: prompt }],
      model,
      max_tokens: 1024,
      stop: ['"""'],
      n: 1,
    };

    try {
      const result = await this.openai.query(content, userId);

      if (result.choices.length === 0) {
        throw new Error(t`OpenAI did not return any choices for your text.`);
      }

      return result.choices[0].message.content ?? text;
    } catch (error) {
      // LLMCallService already converts OpenAI errors to appropriate HTTP exceptions
      // Just re-throw to let the controller handle it
      throw error;
    }
  }
  // endregion

  // region Fix grammar
  async fixGrammar(text: string, userId: string) {
    const model = await this.openai.getModelForUser(userId);
    const prompt = FIX_GRAMMAR_PROMPT.replace("{input}", text);

    const content = {
      messages: [{ role: "user", content: prompt }],
      model,
      max_tokens: 1024,
      stop: ['"""'],
      n: 1,
    };

    try {
      const result = await this.openai.query(content, userId);

      if (result.choices.length === 0) {
        throw new Error(t`OpenAI did not return any choices for your text.`);
      }

      return result.choices[0].message.content ?? text;
    } catch (error) {
      // LLMCallService already converts OpenAI errors to appropriate HTTP exceptions
      // Just re-throw to let the controller handle it
      throw error;
    }
  }

  // endregion

  // region Change tone
  async changeTone(text: string, mood: Mood, userId: string) {
    const model = await this.openai.getModelForUser(userId);
    const prompt = CHANGE_TONE_PROMPT.replace("{mood}", mood).replace("{input}", text);

    const content = {
      messages: [{ role: "user", content: prompt }],
      model,
      max_tokens: 1024,
      stop: ['"""'],
      n: 1,
    };

    try {
      const result = await this.openai.query(content, userId);

      if (result.choices.length === 0) {
        throw new Error(t`OpenAI did not return any choices for your text.`);
      }

      return result.choices[0].message.content ?? text;
    } catch (error) {
      // LLMCallService already converts OpenAI errors to appropriate HTTP exceptions
      // Just re-throw to let the controller handle it
      throw error;
    }
  }
  // endregion
}
