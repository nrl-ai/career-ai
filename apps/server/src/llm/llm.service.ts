import { t } from "@lingui/macro";
import { OpenAI } from "openai";
import { useOpenAiStore } from "@/client/stores/openai";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

export const openai = () => {
  const { apiKey } = useOpenAiStore.getState();

  if (!apiKey) {
    throw new Error(
      t`Your OpenAI API Key has not been set yet. Please go to your account settings to enable OpenAI Integration.`,
    );
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
};

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
    constructor() {}

    // region Improve writing
    async improveWriting(text: string) {
        const prompt = IMPROVE_WRITING_PROMPT.replace("{input}", text);

        const result = await openai().chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gemini-pro",
            max_tokens: 1024,
            temperature: 0,
            stop: ['"""'],
            n: 1,
        });

        if (result.choices.length === 0) {
            throw new Error(t`OpenAI did not return any choices for your text.`);
        }

        return result.choices[0].message.content ?? text;
    }
    // endregion

    // region Fix grammar
    async fixGrammar(text: string) {
        const prompt = FIX_GRAMMAR_PROMPT.replace("{input}", text);

        const result = await openai().chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gemini-pro",
            max_tokens: 1024,
            temperature: 0,
            stop: ['"""'],
            n: 1,
        });

        if (result.choices.length === 0) {
            throw new Error(t`OpenAI did not return any choices for your text.`);
        }

        return result.choices[0].message.content ?? text;
    }

    // endregion

    // region Change tone 
    async changeTone(text: string, mood: Mood) {
        const prompt = CHANGE_TONE_PROMPT.replace("{mood}", mood).replace("{input}", text);

        const result = await openai().chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gemini-pro",
            max_tokens: 1024,
            temperature: 0.5,
            stop: ['"""'],
            n: 1,
        });

        if (result.choices.length === 0) {
            throw new Error(t`OpenAI did not return any choices for your text.`);
        }

        return result.choices[0].message.content ?? text;
    }
    // endregion
}