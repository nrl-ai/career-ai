import { useNavigate } from "react-router-dom";
import { AiSpeakingIcon } from "./_components/ai_speaking_icon";
import { PushToTalkButton } from "./_components/push_to_talk_button";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import { EndInterviewButton } from "./_components/end_interview_button";
import { QuestionCheckBox } from "./_components/question_check_box";
import { useLocation } from "react-router-dom";
import { useAICreateQuestionNoStreaming } from "@/client/services/interview/createQuestionNoStreaming";
import { AxiosResponse } from "axios";

export const InterviewRoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const interviewInfo = location.state;

  const [aiIsSpeaking, setAiIsSpeaking] = useState(false);
  const listFinishedQuestion = [];
  const [finishedQuestion, setFinishedQuestion] = useState<{
    question: string;
    finished: boolean;
  }>();

  // Streaming AI Response
  const inputInterviewInfo = {
    language: interviewInfo.language,
    cv: interviewInfo.cv,
    jd: interviewInfo.jd,
    content: interviewInfo.content,
    position: interviewInfo.position,
    type: interviewInfo.type,
  };
  const [response, setResponse] = useState("");
  const responseRef = useRef<string>();
  const { ai_createQuestion_no_streaming, loading, error, result } =
    useAICreateQuestionNoStreaming();

  useEffect(() => {
    const getAIQuestionResponse = async () => {
      setAiIsSpeaking(true);
      setResponse(await ai_createQuestion_no_streaming(inputInterviewInfo));
      setAiIsSpeaking(false);
    };

    getAIQuestionResponse();
  }, []);

  const handleEndInterviewClick = () => {
    navigate("/dashboard/interview");
  };

  return (
    <div className="h-full w-full p-0 pt-4 flex flex-col bg-[#f2f2f7]">
      <div className="flex items-center gap-x-2">
        <span className="font-medium text-base text-[#AEAEB2]">AI Mocking Interview</span>
        <i className="pi pi-chevron-right text-[#AEAEB2]"></i>
        <span className="font-medium text-base">Interview session</span>
      </div>

      <div className="text-3xl font-semibold my-4">Interviewing</div>

      <div className="flex flex-row gap-x-6 h-fit max-w-[1500px]">
        <div className="flex-grow flex flex-col justify-between">
          <div className="h-2/3"></div>
          <div className="flex flex-col w-full rounded-xl bg-white p-6 justify-between">
            <div className="flex items-center h-[22%] gap-x-6 pb-3 border-b-2 border-[#D1D1D6]">
              <AiSpeakingIcon width="50" height="50" aiIsSpeaking={aiIsSpeaking} />
              <span
                className={`font-medium text-sm ${aiIsSpeaking ? "text-[#007AFF]" : "text-[#8E8E93]"}`}
              >
                NOW
              </span>
              {response != null || response != undefined || response != "" ? (
                <div className="h-full w-full overflow-y-auto">
                  <span className="font-medium text-sm text-[#191919]">
                    {/** AI response goes here */}
                    {response}
                  </span>
                </div>
              ) : (
                <span className="font-medium text-sm text-[#191919]">...</span>
              )}
            </div>
            <div className="flex h-[40%] w-full overflow-y-auto text-center">
              {/** Human answer goes here  */}
              <span id="human_answer" className="font-medium text-sm text-[#191919]">
                Security is always a top priority for me. Uhm... uh.... I follow a secure software
                development lifecycle (SSDLC), which like includes threat modeling, code reviews,
                security testing, and vulnerability scanning. And I also stay up-to-date on the
                latest security best practices and vulnerabilities.... Security is always a top
                priority for me. Uhm... uh.... I follow a secure software development lifecycle
                (SSDLC), which like includes threat modeling, code reviews, security testing, and
                vulnerability scanning. And I also stay up-to-date on the latest security best
                practices and vulnerabilities....
              </span>
            </div>

            <div className="flex items-center justify-center gap-x-3">
              <span>Answer time: </span>
              <span>Word count: </span>
            </div>

            {/** Add on push to record */}
            <div className="w-full flex justify-center">
              <PushToTalkButton width="50" height="50" aiIsSpeaking={aiIsSpeaking} />
            </div>
          </div>
        </div>
        <div className="min-w-[250px] h-full flex flex-col justify-between gap-y-4">
          <div className="bg-white rounded-xl w-full p-6 h-[88%] flex flex-col justify-between gap-y-3">
            <span className="font-semibold text-2xl">Interview questions</span>
            {/** Add dynamic value to progress bar */}
            <ProgressBar
              value={50}
              pt={{
                root: {
                  style: {
                    height: "1.8vh",
                  },
                },
              }}
            />
            <div id="interview_question_container" className="w-full min-h-[59vh] bg-white">
              <QuestionCheckBox
                finishedQuestion={finishedQuestion}
                setFinishedQuestions={setFinishedQuestion}
              />
            </div>
          </div>
          <EndInterviewButton navigate={handleEndInterviewClick} />
        </div>
      </div>
    </div>
  );
};
