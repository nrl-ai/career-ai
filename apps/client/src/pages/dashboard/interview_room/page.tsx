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
      <div className="flex items-center gap-x-2">
        <span className="font-medium text-base text-[#AEAEB2]">AI Mocking Interview</span>
        <i className="pi pi-chevron-right text-[#AEAEB2]"></i>
        <span className="font-medium text-base">Interview session</span>
      </div>

      <div className="text-3xl font-semibold my-4">Interviewing</div>

      <div className="flex flex-row gap-x-6 h-fit max-w-[1500px]">
        <InterviewUI lng="en" />
      </div>
    </div>
  );
};
