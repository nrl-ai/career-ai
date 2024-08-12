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
    constructor(
        private readonly openai: LLMCallService,
    ) {}

    // region Improve writing
    async improveWriting(text: string) {

        const prompt = IMPROVE_WRITING_PROMPT.replace("{input}", text);
        const content = {
            messages: [{ role: "user", content: prompt }],
            model: "gemini-pro",
            max_tokens: 1024,
            temperature: 0,
            stop: ['"""'],
            n: 1,
        }

        const result = await this.openai.query(content)

        if (result.choices.length === 0) {
            throw new Error(t`OpenAI did not return any choices for your text.`);
        }

        return result.choices[0].message.content ?? text;
    }
    // endregion

    // region Fix grammar
    async fixGrammar(text: string) {
        const prompt = FIX_GRAMMAR_PROMPT.replace("{input}", text);

        const content = {
            messages: [{ role: "user", content: prompt }],
            model: "gemini-pro",
            max_tokens: 1024,
            temperature: 0,
            stop: ['"""'],
            n: 1,
        }

        const result = await this.openai.query(content)

        if (result.choices.length === 0) {
            throw new Error(t`OpenAI did not return any choices for your text.`);
        }

        return result.choices[0].message.content ?? text;
    }

    // endregion

    // region Change tone
    async changeTone(text: string, mood: Mood) {
        const prompt = CHANGE_TONE_PROMPT.replace("{mood}", mood).replace("{input}", text);

        const content = {
            messages: [{ role: "user", content: prompt }],
            model: "gemini-pro",
            max_tokens: 1024,
            temperature: 0,
            stop: ['"""'],
            n: 1,
        }

        const result = await this.openai.query(content)

        if (result.choices.length === 0) {
            throw new Error(t`OpenAI did not return any choices for your text.`);
        }

        return result.choices[0].message.content ?? text;
    }
    // endregion
}