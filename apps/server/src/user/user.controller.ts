import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Patch,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UpdateUserDto, UserDto } from "@career-ai/dto";
import { ErrorMessage } from "@career-ai/utils";
import type { Response } from "express";

import { AuthService } from "../auth/auth.service";
import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "./decorators/user.decorator";
import { UserService } from "./user.service";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get("me")
  @UseGuards(TwoFactorGuard)
  fetch(@User() user: UserDto) {
    return user;
  }

  @Patch("me")
  @UseGuards(TwoFactorGuard)
  async update(@User("email") email: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      // If user is updating their email, send a verification email
      if (updateUserDto.email && updateUserDto.email !== email) {
        await this.userService.updateByEmail(email, {
          emailVerified: false,
          email: updateUserDto.email,
        });

        await this.authService.sendVerificationEmail(updateUserDto.email);

        email = updateUserDto.email;
      }

      return await this.userService.updateByEmail(email, {
        name: updateUserDto.name,
        picture: updateUserDto.picture,
        username: updateUserDto.username,
        locale: updateUserDto.locale,
        numRequestsToday: updateUserDto.numRequestsToday,
        lastActiveDay: updateUserDto.lastActiveDay,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
        throw new BadRequestException(ErrorMessage.UserAlreadyExists);
      }

      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("me")
  @UseGuards(TwoFactorGuard)
  async delete(@User("id") id: string, @Res({ passthrough: true }) response: Response) {
    await this.userService.deleteOneById(id);

    response.clearCookie("Authentication");
    response.clearCookie("Refresh");

    response.status(200).send({ message: "Sorry to see you go, goodbye!" });
  }

  @Patch("update-llm-limit")
  @UseGuards(TwoFactorGuard) 
  async updateLLMLitmit(@User("email") email: string, @User('lastActiveDay') lastActiveDay: string) {
    
    const today = new Date()
    const last = new Date(lastActiveDay)

    const formatDate = (date: any) => {
      const x = new Date(date)

      const day = String(x.getDate()).padStart(2, "0");
      const month = String(x.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = x.getFullYear();
  
      return `${year}/${month}/${day}`;
    };

    if (formatDate(today) != formatDate(last)) {
      return await this.userService.updateLLMLimit(
        email, {
          numRequestsToday: 200,
          lastActiveDay: today,
        }
      )
    }

    return await this.userService.updateLLMLimit(
      email, {
        lastActiveDay: today,
      }
    );
  }
}
