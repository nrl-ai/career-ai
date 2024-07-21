import { JDInput } from "@career-ai/ui";
import { useState, useEffect } from "react";
import { CVSelector } from "./_components/cv_selector";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/client/hooks/use-toast";
import { t } from "@lingui/macro";
import { useCreateInterview } from "@/client/services/interview/create";
import { useResumes } from "@/client/services/resume";
import { InterviewDto, ResumeDto } from "@career-ai/dto";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";
import { BaseButton } from "./_components/base_button";
import { useDialog } from "@/client/stores/dialog";

type typeEnum = "technical" | "behavioral" | "combination";
type languageEnum = "VN" | "EN" | "KR";

export const InterviewInformationPage = () => {
  const [jd, setJD] = useState<string | undefined>("");
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const [hasResult, setHasResult] = useState(false);
  const { resumes, loading } = useResumes();
  const [languageSelector, setLanguageSelector] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [type, setType] = useState<typeEnum>("combination");
  const { toast } = useToast();

  const selectedCVDetailed = selectedCV ? resumes?.find((cv) => cv.id === selectedCV) : null;
  const { createInterview, loading: createLoading } = useCreateInterview();

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/dashboard/interview");
  };

  const handleCreateInterviewRoom = (result: InterviewDto) => {
    navigate("/dashboard/interview-room", { state: result });
  };

  const handleSelectCV = (id: string) => {
    setSelectedCV(id);
    setHasResult(false);
  };

  const StartInterview = async () => {
    const cvData = selectedCVDetailed?.data as ResumeDto["data"];
    try {
      const result = await createInterview({
        position: position,
        type: type ? type["code"] : "technical",
        language: language as languageEnum,
        jd: jd as string,
        cv: cvData,
      });

      handleCreateInterviewRoom(result);
    } catch (error) {
      toast({
        variant: "error",
        title: t`${error}`,
      });
    }
  };

  // START: TEMPLATE OF SELECT LANGUAGE BUTTON
  const languageData = [
    {
      name: "Vietnamese",
      code: "VN",
    },
    {
      name: "English",
      code: "EN",
      // "icon":
    },
    {
      name: "Korean",
      code: "KR",
    },
  ];
  // END

  // START: TEMPLATE FOR SELECT TYPE BUTTON
  const typeData = [
    {
      name: "Technical",
      code: "technical",
    },
    {
      name: "Behavioral",
      code: "behavioral",
      // "icon":
    },
    {
      name: "Combination",
      code: "combination",
    },
  ];

  // END

  const startInterviewButtonActive =
    language != "" && position != "" && type != undefined && selectedCVDetailed != null;

  return (
    <div className="h-full w-full p-0 pt-4 flex flex-col bg-[#f2f2f7]">
      {/** TODO: Back to the previous router */}
      <div className="flex items-center gap-x-2">
        <span className="font-medium text-base text-[#AEAEB2]">AI Mocking Interview</span>
        <i className="pi pi-chevron-right text-[#AEAEB2]"></i>
        <span className="font-medium text-base">New interview</span>
      </div>

      <div className="text-3xl font-semibold my-4">New interview</div>

      <div
        className="grid grid-cols-2 gap-x-6 h-fit flex-cols"
        style={{ height: "calc(100vh - 240px)" }}
      >
        <div className="col-span-1 rounded-xl bg-white p-6">
          <span className="font-semibold text-2xl">Applying position</span>
          <div className="grid grid-cols-2 gap-x-3 mt-[18px]">
            <div className="col-span-1 flex flex-col">
              <span className="text-base font-medium">Language</span>
              <Dropdown
                value={languageSelector}
                onChange={(e) => {
                  setLanguageSelector(e.value);
                  setLanguage(e.value.code);
                }}
                options={languageData}
                optionLabel="name"
                placeholder="Select"
                checkmark={true}
                highlightOnSelect={false}
                // valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
                pt={{
                  root: {
                    style: {
                      width: "100%",
                      borderRadius: "10px",
                      border: "none",
                      background: "#F2F2F7",
                    },
                    className:
                      "mt-2 focus-within:outline focus-within:outline-1 focus-within:outline-[#007AFF]",
                  },
                  wrapper: {
                    className: "mt-2 outline outline-1 outline-[#D1D1D6]",
                  },
                  input: {
                    style: { color: language == "" ? "#AEAEB2" : "#191919" },
                    className: `text-base font-medium focus:text-[#191919]`,
                  },
                  trigger: {
                    style: { color: language == "" ? "#AEAEB2" : "#191919" },
                  },
                  list: {
                    className: "p-2 text-base",
                  },
                  item: {
                    className: "flex gap-x-2 items-center",
                  },
                  itemLabel: {
                    className: "font-medium",
                  },
                }}
              />
            </div>

            <div className="col-span-1 flex flex-col grow ">
              <span className="text-base font-medium">Interview type</span>
              <Dropdown
                value={type}
                onChange={(e) => setType(e.value)}
                options={typeData}
                optionLabel="name"
                placeholder="Select"
                checkmark={true}
                highlightOnSelect={false}
                pt={{
                  root: {
                    style: {
                      width: "100%",
                      borderRadius: "10px",
                      border: "none",
                      background: "#F2F2F7",
                    },
                    className:
                      "mt-2 focus-within:outline focus-within:outline-1 focus-within:outline-[#007AFF]",
                  },
                  wrapper: {
                    className: "mt-2 outline outline-1 outline-[#D1D1D6]",
                  },
                  input: {
                    style: { color: type == undefined ? "#AEAEB2" : "#191919" },
                    className: `text-base font-medium focus:text-[#191919] p-2`,
                  },
                  trigger: {
                    style: { color: type == undefined ? "#AEAEB2" : "#191919" },
                  },
                  list: {
                    className: "p-2 text-base",
                  },
                  item: {
                    className: "flex gap-x-2 items-center",
                  },
                  itemLabel: {
                    className: "font-medium",
                  },
                }}
              />
            </div>
          </div>

          <div className="mt-6">
            <span className="text-base font-medium">Position</span>
            <InputText
              type="text"
              placeholder="E.g: Senior Software Engineer"
              onChange={(e) => setPosition(e.target.value)}
              pt={{
                root: {
                  style: {
                    background: "#F2F2F7",
                    borderRadius: "10px",
                    color: "#191919",
                  },
                  className: `w-full border-none text-base font-medium items-center focus:outline focus:outline-1 focus:outline-[#007AFF] focus:shadow-none mt-2 placeholder-[#AEAEB2]`,
                },
              }}
            />
          </div>

          <div className="mt-6 flex flex-col">
            <span className="text-base font-medium">Job description (optional)</span>
            <JDInput
              id="jd-input-field"
              content={jd}
              onChange={setJD}
              isActive={language != "" && position != ""}
              position={position}
              language={language}
            />
          </div>
        </div>

        <div className="col-span-1 rounded-xl bg-white p-6">
          <span className="font-semibold text-2xl">Select Resume</span>

          <div className="flex flex-col mt-[18px]">
            <div className="w-full flex justify-between mt-2 gap-2">
              <BaseButton
                title="Create new resume"
                content="Create new resume from templates"
                icon="pi pi-plus-circle"
                dialog="resume"
              />
              <BaseButton
                title="Import exisiting resume"
                content="LinkedIn, JSON Resume, etc."
                icon="pi pi-arrow-down"
                dialog="import"
              />
            </div>
            <div className="mt-6">
              <span className="text-base text-[#191919] font-medium">Recent Resume</span>
              <CVSelector selectedCV={selectedCV} setSelectedCV={handleSelectCV} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          type="button"
          className="py-3.5 px-[72px] bg-white rounded-xl outline outline-1 outline-[#191919] transition-all duration-200 ease-in-out transform hover:bg-[#F2F2F7]"
          onClick={handleCancel}
        >
          <span className="font-medium text-base text-[#191919]">Cancel</span>
        </button>

        <button
          type="button"
          className={`py-3.5 px-[60px] rounded-xl  ${startInterviewButtonActive === false ? "bg-[#AEAEB2] cursor-not-allowed" : "bg-[#007AFF] transition-all duration-200 ease-in-out transform hover:bg-[#005ABD]"}`}
          disabled={!startInterviewButtonActive}
          onClick={StartInterview}
        >
          <span className="text-white text-medium text-base">Start interview</span>
        </button>
      </div>
    </div>
  );
};
