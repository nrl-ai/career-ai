// import { InformationButton } from "./_components/informationButton";
import { JDInput } from "@career-ai/ui";
import { useState, useEffect } from "react";
// import { AutoGenJDButton } from "./_components/autogen";
import { CVSelector } from "@/client/components/cv_selector";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/client/hooks/use-toast";
import { t } from "@lingui/macro";
import { useCreateInterview } from "@/client/services/interview/create";
import { useResumes } from "@/client/services/resume";
import { ResumeDto } from "@career-ai/dto";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";

export const InterviewInformationPage = () => {
  const [jd, setJD] = useState<string | undefined>("");
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const {resumes, loading} = useResumes();
  const [languageSelector, setLanguageSelector] = useState<string>("");
  const [language, setLanguage] = useState<string>("")
  const [position, setPosition] = useState<string>("");
  const [type, setType] = useState<string>("");

  const selectedCVDetailed = selectedCV ? resumes?.find((cv) => cv.id === selectedCV) : null;
//   const {createInterview, loading: createLoading} = useCreateInterview();

  const navigate = useNavigate();

  const handleCancel = () => { 
    navigate('/dashboard/interview');
  }

  const handleCreateInterviewRoom = () => {
    navigate('/dashboard/interviewRoom');
  }

//   const StartInterview = async () => {
//         const cvData = selectedCVDetailed?.data as ResumeDto["data"]
//         await createInterview({position: positionButtonElementValue, type: typeButtonElementValue?.toLowerCase() as typeEnum, yearOfExp: yearOfExpButtonElementValue, jd: jd as string, cv: cvData})
//         handleCreateInterviewRoom();
//   }

  // START: TEMPLATE OF SELECT LANGUAGE BUTTON
  const languageData = [
        {
            "name": "Vietnamese",
            "code": "VN"
        },
        {
            "name": "English",
            "code": "US",
            // "icon": 
        },
        {
            "name": "Korean",
            "code": "KR"
        }
    ]
  // END


  // START: TEMPLATE FOR SELECT TYPE BUTTON
  const typeData = [
    {
        "name": "Technical",
        "code": "technical"
    },
    {
        "name": "Behavioral",
        "code": "behavioral",
        // "icon": 
    },
    {
        "name": "Combination",
        "code": "combination"
    }
  ]

  // END  

  const startInterviewButtonActive = (language != '' && position != '' && type != '' && jd != '' && selectedCV != '');

  return (
    <div className="h-screen w-full p-6 flex flex-col justify-between bg-[#f2f2f7]">
        {/** TODO: Back to the previous router */}
        <div className="flex items-center gap-x-2">
            <span className="font-medium text-base text-[#AEAEB2]">AI Mocking Interview</span>
            <i className="pi pi-chevron-right text-[#AEAEB2]"></i>
            <span className="font-medium text-base">Interview Input</span>
        </div>

        <div className="text-3xl font-semibold">Interview input</div>

        <div className="grid grid-cols-2 gap-x-6 h-fit flex flex-cols">
            <div className="col-span-1 rounded-[10px] bg-white p-6">
                <span className="font-semibold text-2xl">Interview information</span>
                <div className="grid grid-cols-2 gap-x-3 mt-[18px]">
                    
                    <div className="col-span-1 flex flex-col">
                        <span className="text-base font-semibold">Language</span>
                        <Dropdown value={languageSelector} onChange={(e) => {setLanguageSelector(e.value); setLanguage(e.value.code)}} options={languageData} optionLabel="name" placeholder="Select" 
                        checkmark={true} highlightOnSelect={false} 
                        // valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate}
                        pt={{
                            root: {
                                style: {
                                    width: "100%", 
                                    borderRadius: "10px",
                                    border: "none",
                                    background: "#F2F2F7",
                                },
                                className: "focus-within:outline focus-within:outline-1 focus-within:outline-[#007AFF]" 
                            },
                            wrapper: {
                                className: "mt-2 outline outline-1 outline-[#D1D1D6]"
                            },
                            input: {
                                style: {color: language == "" ? "#AEAEB2": "#191919"},
                                className: `text-base font-medium focus:text-[#191919]`
                            },
                            trigger: {
                                style: {color: language == "" ? "#AEAEB2": "#191919"},
                            },
                            list: {
                                className: "p-2 text-base"
                            },
                            item: {
                              className: "flex gap-x-2 items-center"
                            },
                            itemLabel: {
                                className: "font-medium"
                            }
                        }}
                        />
                    </div>

                    <div className="col-span-1 flex flex-col"
                    >
                        <span className="text-base font-semibold">Interview type</span>
                        <Dropdown value={type} onChange={(e) => setType(e.value)} options={typeData} optionLabel="name" 
                            placeholder="Select" checkmark={true} highlightOnSelect={false} 
                            // className={`w-full ${ language != '' ? 'outline-[#007AFF] text-[#191919]' : 'outline-[#D1D1D6]'}`}
                            pt={{
                                root: {
                                    style: {
                                        width: "100%", 
                                        borderRadius: "10px",
                                        border: "none",
                                        background: "#F2F2F7",
                                    },
                                    className: "focus-within:outline focus-within:outline-1 focus-within:outline-[#007AFF]" 
                                },
                                wrapper: {
                                    className: "mt-2 outline outline-1 outline-[#D1D1D6]"
                                },
                                input: {
                                    style: {color: type == "" ? "#AEAEB2": "#191919"},
                                    className: `text-base font-medium focus:text-[#191919] p-2`
                                },
                                trigger: {
                                    style: {color: type == "" ? "#AEAEB2": "#191919"},
                                },
                                list: {
                                    className: "p-2 text-base"
                                },
                                item: {
                                  className: "flex gap-x-2 items-center"
                                },
                                itemLabel: {
                                    className: "font-medium"
                                }
                            }}/>
                    </div>
                </div>

                <div className="mt-6">
                    <span className="text-base font-semibold">Position</span>
                    <InputText type="text" placeholder="E.g: Senior Software Engineer" onChange={(e) => setPosition(e.target.value)} pt={{
                        root: {
                            style: {
                                background: "#F2F2F7",
                                borderRadius: "10px",
                                color: "#191919"
                            },
                            className: `w-full border-none text-base font-medium items-center focus:outline focus:outline-1 focus:outline-[#007AFF] focus:shadow-none mt-2.5 placeholder-[#AEAEB2]`
                        }
                    }}/>
                </div>
                
                <div className="mt-6">
                    <span className="text-base font-semibold">Job description</span>
                    <JDInput className="min-h-[330px]" id="jd-input-field" content={jd} onChange={setJD} isActive={(language != '' && position != '')} position={position} language={language}/>
                </div>
            </div>

            <div className="col-span-1 rounded-[10px] bg-white p-6">
                <span className="font-semibold text-2xl">Applied resume</span>
            </div>
        </div>
        <div className="flex justify-between">
            <button type="button" className="py-3.5 px-[72px] bg-white rounded-[6px] outline outline-1 outline-[#191919] transition-all duration-200 ease-in-out transform hover:bg-[#F2F2F7]" onClick={handleCancel}>
                <span className="font-medium text-base text-[#191919]">Cancel</span>
            </button>

            <button type="button" className={`py-3.5 px-[60px] rounded-[6px]  ${startInterviewButtonActive === false ? 'bg-[#AEAEB2] cursor-not-allowed' : 'bg-[#007AFF] transition-all duration-200 ease-in-out transform hover:bg-[#005ABD]'}`} 
                disabled={!startInterviewButtonActive}
                onClick={() => {console.log("hello")}}>
                <span className="text-white text-medium text-base">Start interview</span>
            </button>
        </div>  
    </div>
  );
};
