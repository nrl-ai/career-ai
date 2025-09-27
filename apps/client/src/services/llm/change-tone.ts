import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

type changeToneArgs = {
  text: string;
  mood: "casual" | "professional" | "confident" | "friendly";
};

export const changeTone = async ({ text, mood }: changeToneArgs) => {
  const response = await axios.post(`/llm/change-tone`, { text, mood });
  return response.data;
};

export const useChangeTone = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: changeToneFn,
    data: result,
  } = useMutation({
    mutationFn: changeTone,
  });

  return { changeTone: changeToneFn, loading, error, result };
};
