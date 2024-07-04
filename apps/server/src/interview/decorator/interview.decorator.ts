import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { InterviewDto } from "@career-ai/dto";

export const Interview = createParamDecorator(
    (data: keyof InterviewDto | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const interview = request.payload?.interviews as InterviewDto;

        return data ? interview[data]: interview;
    },
);