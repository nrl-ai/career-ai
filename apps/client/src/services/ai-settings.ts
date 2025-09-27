import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateAISettingsDto, AISettingsDto, UpdateAISettingsDto } from "@career-ai/dto";

import { axios } from "@/client/libs/axios";

type AISettingsStatus = {
  hasLlmApiKey: boolean;
  hasElevenLabsApiKey: boolean;
  isConfigured: boolean;
  llmProvider: string;
  llmModel: string;
};

export const useAISettings = () => {
  const queryClient = useQueryClient();

  const {
    error,
    data: settings,
    isLoading: loading,
  } = useQuery({
    queryKey: ["ai-settings"],
    queryFn: async (): Promise<AISettingsDto | null> => {
      try {
        const response = await axios.get("/ai-settings");
        return response.data;
      } catch (error) {
        // Return default settings if none exist
        return {
          llmApiKey: null,
          llmBaseUrl: "https://api.openai.com/v1",
          llmModel: "gpt-5",
          llmProvider: "openai",
          elevenLabsApiKey: null,
        } as AISettingsDto;
      }
    },
  });

  const { mutateAsync: updateSettings } = useMutation({
    mutationFn: async (data: CreateAISettingsDto | UpdateAISettingsDto) => {
      const response = await axios.patch("/ai-settings", data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["ai-settings"], data);
      // Invalidate status cache to refresh configuration status
      queryClient.invalidateQueries({ queryKey: ["ai-settings-status"] });
    },
  });

  const { mutateAsync: deleteSettings } = useMutation({
    mutationFn: async () => {
      await axios.delete("/ai-settings");
    },
    onSuccess: () => {
      queryClient.setQueryData(["ai-settings"], {
        llmApiKey: null,
        llmBaseUrl: "https://api.openai.com/v1",
        llmModel: "gpt-5",
        llmProvider: "openai",
        elevenLabsApiKey: null,
      });
      // Invalidate status cache to refresh configuration status
      queryClient.invalidateQueries({ queryKey: ["ai-settings-status"] });
    },
  });

  return {
    settings,
    updateSettings,
    deleteSettings,
    loading,
    error,
  };
};

export const useAISettingsStatus = () => {
  const {
    data: status,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["ai-settings-status"],
    queryFn: async (): Promise<AISettingsStatus> => {
      try {
        const response = await axios.get("/ai-settings/status");
        return response.data;
      } catch (error) {
        // Return default status if none exist
        return {
          hasLlmApiKey: false,
          hasElevenLabsApiKey: false,
          isConfigured: false,
          llmProvider: "openai",
          llmModel: "gpt-5",
        };
      }
    },
  });

  return {
    status,
    loading,
    error,
    isConfigured: status?.isConfigured || false,
    hasLlmApiKey: status?.hasLlmApiKey || false,
    hasElevenLabsApiKey: status?.hasElevenLabsApiKey || false,
  };
};
