import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ErrorMessage } from "@career-ai/utils";
import { PrismaService } from "nestjs-prisma";

import { StorageService } from "../storage/storage.service";

@Injectable()
export class JobApplicationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
  ) {}
  updateByEmail(email: string, data: Prisma.UserUpdateArgs["data"]) {
    return this.prisma.user.update({ where: { email }, data });
  }
}
