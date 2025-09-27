import { zodResolver } from "@hookform/resolvers/zod";
import { t, Trans } from "@lingui/macro";
import { LockSimple, LockSimpleOpen, TrashSimple } from "@phosphor-icons/react";
import {
  Alert,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@career-ai/ui";
import { cn } from "@career-ai/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

import { useAISettings, useAISettingsStatus } from "@/client/services/ai-settings";

const formSchema = z.object({
  llmApiKey: z.string().optional(),
  llmBaseUrl: z.string().url().default("https://api.openai.com/v1"),
  llmModel: z.string().default("gpt-5"),
  llmProvider: z.enum(["openai", "azure", "anthropic", "custom"]).default("openai"),
  elevenLabsApiKey: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const AISettings = () => {
  const { settings, updateSettings, deleteSettings, loading } = useAISettings();
  const { hasLlmApiKey, hasElevenLabsApiKey, isConfigured } = useAISettingsStatus();
  const isEnabled = isConfigured;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      llmApiKey: "",
      llmBaseUrl: "https://api.openai.com/v1",
      llmModel: "gpt-5",
      llmProvider: "openai",
      elevenLabsApiKey: "",
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        llmApiKey: settings.llmApiKey || "",
        llmBaseUrl: settings.llmBaseUrl,
        llmModel: settings.llmModel,
        llmProvider: settings.llmProvider as "openai" | "azure" | "anthropic" | "custom",
        elevenLabsApiKey: settings.elevenLabsApiKey || "",
      });
    }
  }, [settings, form]);

  const onSubmit = async (data: FormValues) => {
    await updateSettings(data);
    form.reset(data);
  };

  const onRemove = async () => {
    await deleteSettings();
    form.reset({
      llmApiKey: "",
      llmBaseUrl: "https://api.openai.com/v1",
      llmModel: "gpt-5",
      llmProvider: "openai",
      elevenLabsApiKey: "",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`AI Configuration`}</h3>
        <p className="leading-relaxed opacity-75">
          {t`Configure your preferred AI providers, models, and API settings. These settings will be used across all AI features in CareerAI including LLM, STT, and TTS services.`}
        </p>
      </div>

      {!isConfigured && (
        <Alert variant="error">
          <div className="prose prose-sm max-w-full">
            <p className="font-semibold">{t`AI Configuration Required`}</p>
            <p>
              {t`You must configure at least one API key to use AI features in CareerAI. Without proper configuration, features like resume optimization, interview practice, and AI writing assistance will not be available.`}
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t`Configure OpenAI API key for LLM features (resume analysis, interview questions, writing assistance)`}</li>
              <li>{t`Configure ElevenLabs API key for high-quality text-to-speech in interviews`}</li>
            </ul>
          </div>
        </Alert>
      )}

      <div className="prose prose-sm prose-zinc max-w-full dark:prose-invert">
        <p>
          <Trans>
            You have the option to{" "}
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://www.howtogeek.com/885918/how-to-get-an-openai-api-key/"
            >
              obtain your own OpenAI API key
            </a>
            . This key empowers you to leverage the API as you see fit. Alternatively, if you wish
            to disable the AI features in CareerAI altogether, you can simply remove the key from
            your settings.
          </Trans>
        </p>
      </div>

      <Form {...form}>
        <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              name="llmProvider"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Provider`}</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={t`Select provider`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="azure">Azure OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="llmModel"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Model`}</FormLabel>
                  <FormControl>
                    <Input placeholder="gpt-5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="llmBaseUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t`Base URL`}</FormLabel>
                <FormControl>
                  <Input placeholder="https://api.openai.com/v1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="llmApiKey"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  {t`LLM API Key`}
                  {hasLlmApiKey && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {t`Configured`}
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={
                      hasLlmApiKey ? t`API key is configured (enter new key to update)` : "sk-..."
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="my-6" />

          <div className="space-y-2">
            <h4 className="text-lg font-semibold">{t`Voice Services`}</h4>
            <p className="text-sm text-gray-600">
              {t`Configure ElevenLabs for high-quality text-to-speech functionality.`}
            </p>
          </div>

          <FormField
            name="elevenLabsApiKey"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  {t`ElevenLabs API Key`}
                  {hasElevenLabsApiKey && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {t`Configured`}
                    </span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={
                      hasElevenLabsApiKey
                        ? t`API key is configured (enter new key to update)`
                        : "xi-..."
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2">
            <Button type="submit" disabled={loading}>
              {loading ? t`Saving...` : t`Save Configuration`}
            </Button>

            {isEnabled && (
              <Button type="button" variant="ghost" onClick={onRemove} disabled={loading}>
                <TrashSimple className="mr-2" />
                {t`Reset to Default`}
              </Button>
            )}
          </div>
        </form>
      </Form>
      {/* 
      <Alert variant="warning">
        <div className="prose prose-neutral max-w-full text-xs leading-relaxed text-primary dark:prose-invert">
          <Trans>
            <span className="font-medium">Note: </span>
            By utilizing the OpenAI API, you acknowledge and accept the{" "}
            <a
              href="https://openai.com/policies/terms-of-use"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              terms of use
            </a>{" "}
            and{" "}
            <a
              href="https://openai.com/policies/privacy-policy"
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              privacy policy
            </a>{" "}
            outlined by OpenAI. Please note that CareerAI bears no responsibility for any improper
            or unauthorized utilization of the service, and any resulting repercussions or
            liabilities solely rest on the user.
          </Trans>
        </div>
      </Alert> */}
    </div>
  );
};
