import { InformationButton } from "./_components/informationButton";
import { RichInput } from "@career-ai/ui";
import { useState } from "react";
import { AutoGenJDButton } from "./_components/autogen";
import { CVSelector } from "@/client/components/cv_selector";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/client/hooks/use-toast";
import { t } from "@lingui/macro";
import { useCreateInterview } from "@/client/services/interview/create";
import { useResumes } from "@/client/services/resume";
import { ResumeDto } from "@career-ai/dto";

type typeEnum = "behavioral" | "mixed" | "technical";

export const InterviewInformationPage = () => {
  const [jd, setJD] = useState<string | undefined>("");
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const {resumes, loading} = useResumes();

  const selectedCVDetailed = selectedCV ? resumes?.find((cv) => cv.id === selectedCV) : null;

  const { toast } = useToast();
  const [positionIsActive, setPositionIsActive] = useState<string>("[#B3B3B3]");
  const [typeIsActive, setTypeIsActive] = useState<string>("[#B3B3B3]");
  const [experienceIsActive, setExperienceIsActive] = useState<string>("[#B3B3B3]");
  const {createInterview, loading: createLoading} = useCreateInterview();

  const navigate = useNavigate();

  const handleOnClick = () => { 
    navigate('/dashboard/interview');
  }

  const handleCreateInterviewRoom = () => {
    navigate('/dashboard/interviewRoom');
  }

  const StartInterview = async () => {
    var positionButtonElementValue = document.getElementById("position-button")?.textContent as string;
    // var levelButtonElement = document.getElementById("level-button");
    var yearOfExpButtonElementValue = document.getElementById("yearOfExp-button")?.textContent as string;
    var typeButtonElementValue = document.getElementById("type-button")?.textContent;

    if (positionButtonElementValue === "Chức vụ") {
        setPositionIsActive("error")
    }

    if (typeButtonElementValue === "Loại phỏng vấn") {
        setTypeIsActive("error")
    }

    if (yearOfExpButtonElementValue === "Số năm kinh nghiệm") {
        setExperienceIsActive("error")
    }

    if (jd === "") {}

    if (selectedCV === null) {}

    if (positionButtonElementValue === "Chức vụ" || yearOfExpButtonElementValue === "Số năm kinh nghiệm" || typeButtonElementValue === "Loại phỏng vấn" || jd === "" || selectedCV === null) {
        toast({
            variant: "error",
            title: t`Incomplete submission`,
            description: t`Please make sure you have selected all required fields!`,
        });
    } 
    else {
        const cvData = selectedCVDetailed?.data as ResumeDto["data"]
        await createInterview({position: positionButtonElementValue, type: typeButtonElementValue?.toLowerCase() as typeEnum, yearOfExp: yearOfExpButtonElementValue, jd: jd as string, cv: cvData})
        handleCreateInterviewRoom();
    }
  }

  return (
    <div className="h-screen p-9">
      <div className="gap-y flex h flex-col gap-y-5">
        <div className="flex items-center gap-x-5">
            <button onClick={handleOnClick}>
                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 3L6 11L14 19" stroke="black" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <span className="text-2xl font-bold">Thông tin phỏng vấn</span>
        </div>

        <div className="flex flex-col gap-y-5">
            <div className="flex gap-x-4 items-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#3D6CF5"/>
                    <path d="M23.1992 10.8906V28H20.0938V14.5117L15.9805 15.8711V13.3633L22.8477 10.8906H23.1992Z" fill="white"/>
                </svg>
                <span className="font-bold text-lg">
                    Mô tả công việc vị trí ứng tuyển
                </span>
            </div>

            <div className="inline-flex justify-between z-20">
                <InformationButton positionIsActive={positionIsActive} typeIsActive={typeIsActive} experienceIsActive={experienceIsActive}/>
                <AutoGenJDButton/>
            </div>
            <RichInput id="jd-input-field" content={jd} onChange={setJD} />
        </div>
        <div className="flex flex-col gap-y-5">
            <div className="flex gap-x-4 items-center">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#3D6CF5"/>
                    <path d="M24.7852 25.5625V28H13.2305V25.9141L18.7734 19.9258C19.3516 19.2695 19.8086 18.6992 20.1445 18.2148C20.4805 17.7305 20.7188 17.293 20.8594 16.9023C21.0078 16.5039 21.082 16.125 21.082 15.7656C21.082 15.2422 20.9883 14.7852 20.8008 14.3945C20.6133 13.9961 20.3398 13.6875 19.9805 13.4688C19.6289 13.25 19.1953 13.1406 18.6797 13.1406C18.1094 13.1406 17.6211 13.2734 17.2148 13.5391C16.8164 13.7969 16.5117 14.1562 16.3008 14.6172C16.0977 15.0781 15.9961 15.6055 15.9961 16.1992H12.8906C12.8906 15.1914 13.125 14.2734 13.5938 13.4453C14.0625 12.6094 14.7344 11.9414 15.6094 11.4414C16.4844 10.9414 17.5234 10.6914 18.7266 10.6914C19.8984 10.6914 20.8906 10.8867 21.7031 11.2773C22.5156 11.6602 23.1328 12.207 23.5547 12.918C23.9766 13.6289 24.1875 14.4766 24.1875 15.4609C24.1875 16.0078 24.0977 16.5469 23.918 17.0781C23.7383 17.6094 23.4844 18.1367 23.1562 18.6602C22.8359 19.1758 22.4531 19.6992 22.0078 20.2305C21.5625 20.7617 21.0664 21.3047 20.5195 21.8594L17.1914 25.5625H24.7852Z" fill="white"/>
                </svg>
                <span className="font-bold text-lg">
                    Chọn CV ứng tuyển
                </span>
            </div>
            <CVSelector selectedCV={selectedCV} setSelectedCV={setSelectedCV} />
        </div>

        <div className="w-full flex justify-end">
            <button
                type="button"
                className="h-[50px] w-[262px] rounded-[10px] bg-[#3d6cf5] text-white font-bold text-base"
                onClick={StartInterview}
                > 
                Bắt đầu phỏng vấn
            </button>
        </div>
      </div>
    </div>
  );
};
