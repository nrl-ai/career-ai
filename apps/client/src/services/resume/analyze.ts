import { ResumeDto } from "@career-ai/dto";
import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

type AnalyzeResumeArgs = {
  id: string;
  jd: string;
};

export const analyzeResume = async ({ id, jd }: AnalyzeResumeArgs) => {
  const response = await axios.post(`/resume/${id}/analyze`, { jd });
  return response.data;
};

export const useAnalyzeResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: analyzeResumeFn,
    data: result,
  } = useMutation({
    mutationFn: analyzeResume,
  });

  return { analyzeResume: analyzeResumeFn, loading, error, result };
};