import { CreateInterviewDto, InterviewDto } from "@career-ai/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const createInterview = async (data: CreateInterviewDto) => {
  const response = await axios.post<InterviewDto, AxiosResponse<InterviewDto>, CreateInterviewDto>(
    "/interview",
    data,
  );

  return response.data;
};

export const useCreateInterview = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: createInterviewFn,
  } = useMutation({
    mutationFn: createInterview,
    onSuccess: (data) => {
      queryClient.setQueryData<InterviewDto>(["interview", { id: data.id }], data);

      queryClient.setQueryData<InterviewDto[]>(["interview"], (cache) => {
        if (!cache) return [data];
        return [...cache, data];
      });
    },
  });

  return { createInterview: createInterviewFn, loading, error };
};
