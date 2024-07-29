import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const fixGrammar = async (text: string) => {
  const response = await axios.post(`/llm/fix-grammar`, {text});
  return response.data;
}

export const useFixGrammar = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: fixGrammarFn,
    data: result,
  } = useMutation({
    mutationFn: fixGrammar,
  });

  return { fixGrammar: fixGrammarFn, loading, error, result };
}