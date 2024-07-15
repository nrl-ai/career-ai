import { InterviewDto } from "@career-ai/dto";
import { UserDto } from "@career-ai/dto";
import { axios } from "@/client/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { INTERVIEWS_KEY } from "@/client/constants/query-keys";

export const findInterviewsByUserId = async (data: { start: number; end: number }) => {
  const response = await axios.get<InterviewDto[], AxiosResponse<InterviewDto[]>>(
    `/interview/${data.start}/${data.end}`,
  );

  return response.data;
};

export const useFindInterviewsByUserId = (start: number, end: number) => {
  const {
    error,
    isPending: loading,
    data: result,
  } = useQuery({
    queryKey: INTERVIEWS_KEY,
    queryFn: () => findInterviewsByUserId({ start, end }),
  });

  return { result, loading, error };
};
