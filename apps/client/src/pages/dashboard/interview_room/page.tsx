import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { InterviewUI } from "./_components/interview";

export const InterviewRoomPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEndInterviewClick = () => {
    navigate("/dashboard/interview");
  };

  return (
    <div className="h-full w-full p-0 pt-4 flex flex-col bg-[#f2f2f7]">
      <div className="flex flex-grow-0 items-center gap-x-2">
        <span className="font-medium text-base text-[#AEAEB2]">AI Mocking Interview</span>
        <i className="pi pi-chevron-right text-[#AEAEB2]"></i>
        <span className="font-medium text-base">Interviewing</span>
      </div>
      <div className="flex flex-grow flex-row gap-x-6 h-fit">
        <InterviewUI lng="en" />
      </div>
    </div>
  );
};
