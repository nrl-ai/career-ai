import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const updateLLMLimit = async () => {
  const response = await axios.patch(
    "/user/update-llm-limit",
  );

  return response.data;
};

export const useUpdateLLMLimit = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateLLMLimitFn,
  } = useMutation({
    mutationFn: updateLLMLimit,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
  });

  return { updateLLMLimit: updateLLMLimitFn, loading, error };
};
