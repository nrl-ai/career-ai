import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { InterviewUI } from "./_components/interview";

export const InterviewRoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const interviewInput = {
    language : location.state['language'],
    type: location.state['type'],
    position: location.state['position'],
    jd: location.state['jd'],
    cv: location.state['cv']
  };

  return (
    <div className="h-full w-full p-0 pt-4 flex flex-col bg-[#f2f2f7]">
      <div className="flex flex-grow-0 items-center gap-x-2">
        <span className="font-medium text-base text-[#AEAEB2] cursor-pointer">AI Mocking Interview</span>
        <i className="pi pi-chevron-right text-[#AEAEB2]"></i>
        <span className="font-medium text-base cursor-pointer">Interviewing</span>
      </div>
      <div className="flex flex-grow flex-row gap-x-6 h-fit">
        <InterviewUI lng="en" state={interviewInput}/>
      </div>
    </div>
  );
};
