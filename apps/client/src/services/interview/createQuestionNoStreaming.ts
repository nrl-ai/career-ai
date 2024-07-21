import { InterviewQuestionDto } from "@career-ai/dto";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const ai_createQuestion_no_streaming = async (data: InterviewQuestionDto) => {
  const question = await axios.post(`/api/interview/createQuestion`, data);
  return question.data;
};

export const useAICreateQuestionNoStreaming = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: ai_createQuestion_no_streamingfn,
    data: result,
  } = useMutation({
    mutationFn: ai_createQuestion_no_streaming,
  });

  return {
    ai_createQuestion_no_streaming: ai_createQuestion_no_streamingfn,
    loading,
    error,
    result,
  };
};
