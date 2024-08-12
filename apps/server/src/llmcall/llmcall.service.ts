import { Injectable } from "@nestjs/common";
import { OpenAI } from "openai";

@Injectable()
export class LLMCallService {
    constructor(
    ) { }

    async query(content: any) {

        // Here we use OpenAI as the common interface.
        // Other LLM Services will be integrated with LiteLLM's unified interface.
        // https://www.litellm.ai/
        const openai = new OpenAI({
            baseURL: process.env["LLM_BASE_URL"],
            apiKey: process.env["LLM_API_KEY"],
        });

        const result = await openai.chat.completions.create(content);

        return result;
    }
}