import { useNavigate } from "react-router-dom";
import { AiSpeakingIcon } from "./_components/ai_speaking_icon";
import { PushToTalkButton } from "./_components/push_to_talk_button";
import { useEffect, useRef, useState } from "react";
import { ProgressBar } from 'primereact/progressbar';
import { EndInterviewButton } from "./_components/end_interview_button";

export const InterviewRoomPage = () => {
  const navigate = useNavigate();
  const [aiIsSpeaking, setAiIsSpeaking] = useState(true);
  const handleOnClick = () => {
    navigate("/dashboard/interviewInformation");
  };


  return (
    <div className="h-full w-full p-6 flex flex-col bg-[#f2f2f7]">
      <div className="flex items-center gap-x-2">
        <span className="font-medium text-base text-[#AEAEB2]">AI Mocking Interview</span>
        <i className="pi pi-chevron-right text-[#AEAEB2]"></i>
        <span className="font-medium text-base">Interview session</span>
      </div>

      <div className="text-3xl font-semibold my-4">Interviewing...</div>

      <div className="grid grid-cols-4 gap-x-6 h-fit flex-cols">
        <div className="col-span-3 flex flex-col justify-between" style={{height: 'calc(100vh - 172px )'}}>
          {/** AI Interview Screen stand here */}
          <div className="h-1/2"></div>
          <div className="flex flex-col w-full h-[48%] rounded-[10px] bg-white p-6 justify-between">
            <div className="flex items-center h-[22%] gap-x-6 pb-3 border-b-2 border-[#D1D1D6]">
              <AiSpeakingIcon width="50" height="50" aiIsSpeaking={aiIsSpeaking}/>
              <span className={`font-medium text-sm ${aiIsSpeaking ? 'text-[#007AFF]' : 'text-[#8E8E93]'}`}>NOW</span>
              {aiIsSpeaking ? 
              <div className="h-full w-full overflow-y-auto">
                <span className="font-medium text-sm text-[#191919]">
                  {/** AI response goes here */}
                  Welcome to the ultimate guide for starting a new CrewAI project. This document will walk you through the steps to create, customize, and run your CrewAI project, ensuring you have everything you need to get started.
                  Welcome to the ultimate guide for starting a new CrewAI project. This document will walk you through the steps to create, customize, and run your CrewAI project, ensuring you have everything you need to get started.
                  Welcome to the ultimate guide for starting a new CrewAI project. This document will walk you through the steps to create, customize, and run your CrewAI project, ensuring you have everything you need to get started.
                  Welcome to the ultimate guide for starting a new CrewAI project. This document will walk you through the steps to create, customize, and run your CrewAI project, ensuring you have everything you need to get started.
                  Welcome to the ultimate guide for starting a new CrewAI project. This document will walk you through the steps to create, customize, and run your CrewAI project, ensuring you have everything you need to get started.
                  Welcome to the ultimate guide for starting a new CrewAI project. This document will walk you through the steps to create, customize, and run your CrewAI project, ensuring you have everything you need to get started.
                  Welcome to the ultimate guide for starting a new CrewAI project. This document will walk you through the steps to create, customize, and run your CrewAI project, ensuring you have everything you need to get started.
                  Welcome to the ultimate guide for starting a new CrewAI project. This document will walk you through the steps to create, customize, and run your CrewAI project, ensuring you have everything you need to get started.
                </span>
              </div>
              : 
                <span className="font-medium text-sm text-[#191919]">...</span>
              }
            </div>
            <div className="flex h-[20%] w-full overflow-y-auto text-center">

              {/** Human answer goes here  */}
              <span id="human_answer" className="font-medium text-sm text-[#191919]">
                Security is always a top priority for me. Uhm... uh.... I follow a secure software development lifecycle (SSDLC), which like includes threat modeling, code reviews, security testing, and vulnerability scanning. And I also stay up-to-date on the latest security best practices and vulnerabilities....
                Security is always a top priority for me. Uhm... uh.... I follow a secure software development lifecycle (SSDLC), which like includes threat modeling, code reviews, security testing, and vulnerability scanning. And I also stay up-to-date on the latest security best practices and vulnerabilities....
              </span>
            </div>

            <div className="flex items-center justify-center gap-x-3">
              <span>Answer time: </span>
              <span>Word count: </span>
            </div>
            
            {/** Add on push to record */}
            <div className="w-full flex justify-center">
              <PushToTalkButton width="50" height="50" aiIsSpeaking={aiIsSpeaking}/>
            </div>
          </div>
        </div>  
        <div className="col-span-1 h-full flex flex-col justify-between">
          {/* <div className="bg-white rounded-[10px] w-full p-6" style={{height: "calc(100vh - 300px)"}}> */}
          <div className="bg-white rounded-[10px] w-full p-6 h-[88%] flex flex-col justify-between gap-y-3">
            <span className="font-semibold text-2xl">Interview questions</span>
            {/** Add dynamic value to progress bar */}
            <ProgressBar value={50} pt={{
              root: {
                style: {
                  height: "1.8vh"
                }
              }
            }}/>
            <div id="interview_question_container" className="flex-grow min-h-[59vh] bg-black"></div>
          </div>
          <EndInterviewButton />
        </div>
      </div>  
    </div>
  );
};
