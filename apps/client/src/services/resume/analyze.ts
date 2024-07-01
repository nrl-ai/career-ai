import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

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
