import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LLMService } from "./llm.service";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";
import { User as UserEntity } from "@prisma/client";

@ApiTags("LLM")
@Controller("llm")
export class LLMController {
    constructor(private readonly llmService: LLMService) {}

    @Post("/improve-writing") 
    @UseGuards(TwoFactorGuard)
    async improveWriting(@User("numRequestsToday") numRequestsToday: number, @Body('text') text: string) {

        if (numRequestsToday <= 0) {
            return -1;
        }
          
        return await this.llmService.improveWriting(text);
    }

    @Post("/fix-grammar") 
    @UseGuards(TwoFactorGuard)
    async fixGrammar(@User("numRequestsToday") numRequestsToday: number, @Body('text') text: string) {

        if (numRequestsToday <= 0) {
            return -1;
        }

        return await this.llmService.fixGrammar(text);
    }

    @Post("/change-tone") 
    @UseGuards(TwoFactorGuard)
    async changeTone(@User("numRequestsToday") numRequestsToday: number, @Body('text') text: string, @Body('mood') mood:  "casual" | "professional" | "confident" | "friendly") {

        if (numRequestsToday <= 0) {
            return -1;
        }

        return await this.llmService.changeTone(text, mood);
    }
}