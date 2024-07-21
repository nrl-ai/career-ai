import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

type aiCreateJdArgs = {
  position: string;
  language: string;
};
export const ai_createJd = async ({ position, language }: aiCreateJdArgs) => {
  const response = await axios.post(`/interview/createJd`, {position, language});
  return response.data;
};

export const useAiCreateJd = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: ai_createJdFn,
    data: result,
  } = useMutation({
    mutationFn: ai_createJd,
  });

  return { ai_createJd: ai_createJdFn, loading, error, result };
};
