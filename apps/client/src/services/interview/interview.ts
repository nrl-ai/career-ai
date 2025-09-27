import { InterviewDto } from "@career-ai/dto";
import { UserDto } from "@career-ai/dto";
import { axios } from "@/client/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { INTERVIEWS_KEY } from "@/client/constants/query-keys";

export const findInterviewsByUserId = async () => {
  const response = await axios.get<InterviewDto[], AxiosResponse<InterviewDto[]>>(
    `/interview/findAll`,
  );

  return response.data;
};

export const useFindInterviewsByUserId = () => {
  const {
    error,
    isPending: loading,
    data: result,
  } = useQuery({
    queryKey: INTERVIEWS_KEY,
    queryFn: () => findInterviewsByUserId(),
  });

  return { result, loading, error };
};
