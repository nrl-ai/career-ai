import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const improveWriting = async (text: string) => {
  const response = await axios.post(`/llm/improve-writing`, { text });
  return response.data;
};

export const useImproveWriting = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: improveWritingFn,
    data: result,
  } = useMutation({
    mutationFn: improveWriting,
  });

  return { improveWriting: improveWritingFn, loading, error, result };
};
