import { InterviewDto } from "@career-ai/dto";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const generateInterviewQuestion = async (data: InterviewDto) => {
    const response = await axios.post(
      `/interview/createQuestion`, data,
    );
  
    return response.data;
  };

  export const useGenerateInterviewQuestion = () => {
    const {
        error,
        isPending: loading, 
        mutateAsync: generateInterviewQuestionFn,
        data: result, 
    } = useMutation({
        mutationFn: generateInterviewQuestion,
    });

    return {generateInterviewQuestion : generateInterviewQuestionFn, loading, error, result};
  }