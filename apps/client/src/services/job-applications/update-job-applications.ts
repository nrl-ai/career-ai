import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const updateJobApplications = async (data: any) => {
  const response = await axios.patch<any, AxiosResponse<any>, any>("/job_applications", data);

  return response.data;
};

export const useUpdateJobApplications = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateJobApplicationsFn,
  } = useMutation({
    mutationFn: updateJobApplications,
    onSuccess: (data) => {
      queryClient.setQueryData(["JobApplications"], data);
    },
  });

  return { updateJobApplications: updateJobApplicationsFn, loading, error };
};
