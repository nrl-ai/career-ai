import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LLMService } from "./llm.service";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";

@ApiTags("LLM")
@Controller("llm")
export class LLMController {
  constructor(private readonly llmService: LLMService) {}

  @Post("/improve-writing")
  @UseGuards(TwoFactorGuard)
  async improveWriting(@User() user: any, @Body("text") text: string) {
    return await this.llmService.improveWriting(text, user.id);
  }

  @Post("/fix-grammar")
  @UseGuards(TwoFactorGuard)
  async fixGrammar(@User() user: any, @Body("text") text: string) {
    return await this.llmService.fixGrammar(text, user.id);
  }

  @Post("/change-tone")
  @UseGuards(TwoFactorGuard)
  async changeTone(
    @User() user: any,
    @Body("text") text: string,
    @Body("mood") mood: "casual" | "professional" | "confident" | "friendly",
  ) {
    return await this.llmService.changeTone(text, mood, user.id);
  }
}
