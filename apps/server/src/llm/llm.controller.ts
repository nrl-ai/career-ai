import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LLMService } from "./llm.service";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";

@ApiTags("LLM")
@Controller("llm")
export class LLMController {
    constructor(private readonly llmService: LLMService) {}

    @Post("/improve-writing") 
    @UseGuards(TwoFactorGuard)
    async improveWriting(@Body('text') text: string) {
        return await this.llmService.improveWriting(text);
    }

    @Post("/fix-grammar") 
    @UseGuards(TwoFactorGuard)
    async fixGrammar(@Body('text') text: string) {
        return await this.llmService.fixGrammar(text);
    }

    @Post("/change-tone") 
    @UseGuards(TwoFactorGuard)
    async changeTone(@Body('text') text: string, @Body('mood') mood:  "casual" | "professional" | "confident" | "friendly") {
        return await this.llmService.changeTone(text, mood);
    }
}