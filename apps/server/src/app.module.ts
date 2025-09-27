import path from "node:path";

import { HttpException, Module } from "@nestjs/common";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
// import { RavenInterceptor, RavenModule } from "nest-raven";
import { ZodValidationPipe } from "nestjs-zod";

import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { ContributorsModule } from "./contributors/contributors.module";
import { DatabaseModule } from "./database/database.module";
import { FeatureModule } from "./feature/feature.module";
import { HealthModule } from "./health/health.module";
import { MailModule } from "./mail/mail.module";
import { PrinterModule } from "./printer/printer.module";
import { ResumeModule } from "./resume/resume.module";
import { StorageModule } from "./storage/storage.module";
import { TranslationModule } from "./translation/translation.module";
import { UserModule } from "./user/user.module";
import { InterviewsModule } from "./interview/interview.module";
import { JobApplicationsModule } from "./job_applications/job_applications.module";
import { VoiceModule } from "./voice/voice.module";
import { LLMModule } from "./llm/llm.module";
import { LLMCallModule } from "./llmcall/llmcall.module";
import { AISettingsModule } from "./ai-settings/ai-settings.module";

@Module({
  imports: [
    // Core Modules
    ConfigModule,
    DatabaseModule,
    MailModule,
    // RavenModule, // Temporarily disabled due to compatibility issues
    HealthModule,

    // Feature Modules
    AuthModule.register(),
    UserModule,
    ResumeModule,
    StorageModule,
    PrinterModule,
    FeatureModule,
    JobApplicationsModule,
    TranslationModule,

    InterviewsModule,
    LLMModule,
    LLMCallModule,
    AISettingsModule,

    // Static Assets
    ServeStaticModule.forRoot({
      serveRoot: "/artboard",
      // eslint-disable-next-line unicorn/prefer-module
      rootPath: path.join(__dirname, "..", "artboard"),
    }),
    ServeStaticModule.forRoot({
      renderPath: "/*",
      // eslint-disable-next-line unicorn/prefer-module
      rootPath: path.join(__dirname, "..", "client"),
    }),
    VoiceModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    // Temporarily disabled Sentry/Raven interceptor due to compatibility issues
    // {
    //   provide: APP_INTERCEPTOR,
    //   useValue: new RavenInterceptor({
    //     filters: [
    //       // Filter all HttpException with status code <= 500
    //       {
    //         type: HttpException,
    //         filter: (exception: HttpException) => exception.getStatus() < 500,
    //       },
    //     ],
    //   }),
    // },
  ],
})
export class AppModule {}
