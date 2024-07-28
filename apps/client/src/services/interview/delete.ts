import { DeleteInterviewDto, InterviewDto } from "@career-ai/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const deleteInterview = async (data: DeleteInterviewDto) => {
  const response = await axios.delete<InterviewDto, AxiosResponse<InterviewDto>, DeleteInterviewDto>(
    `/interview/${data.id}`,
  );

  return response.data;
};

export const useDeleteInterview = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: deleteInterviewFn,
  } = useMutation({
    mutationFn: deleteInterview,
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["interviews", data.id] });

      queryClient.setQueryData<InterviewDto[]>(["interviews"], (cache) => {
        if (!cache) return [];
        return cache.filter((interview) => interview.id !== data.id);
      });
    },
  });

  return { deleteInterview: deleteInterviewFn, loading, error };
};