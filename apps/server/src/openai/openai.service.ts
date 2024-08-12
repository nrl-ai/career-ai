import { Injectable } from "@nestjs/common";
import { OpenAI } from "openai";
import { UserService } from "../user/user.service";

@Injectable() 
export class OpenAIService {
    constructor(
    ) {}

    async openai(content: any) {

        const openai = new OpenAI({
            baseURL: process.env["LLM_BASE_URL"],
            apiKey: process.env["LLM_API_KEY"],
        });

        const result = await openai.chat.completions.create(content);

        return result;
    }
}