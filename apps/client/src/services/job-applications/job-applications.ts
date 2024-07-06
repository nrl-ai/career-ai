import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

import { axios } from "@/client/libs/axios";
import { useJobApplicationsStore } from "@/client/stores/job_applications";

export const fetchJobApplications = async () => {
  const response = await axios.get<any | undefined, AxiosResponse<any | undefined>>(
    "/job_applications",
  );

  return response.data;
};

export const useJobApplications = () => {
  const setJobApplications = useJobApplicationsStore((state) => state.setJobApplications);

  const {
    error,
    isPending: loading,
    data: jobApplications,
  } = useQuery({
    queryKey: ["JobApplications"],
    queryFn: fetchJobApplications,
  });

  useEffect(() => {
    setJobApplications(jobApplications ?? null);
  }, [jobApplications, setJobApplications]);

  return { jobApplications, loading, error };
};
