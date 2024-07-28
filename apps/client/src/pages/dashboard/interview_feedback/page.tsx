import { Gauge } from "../interview/_components/gauge";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export const InterviewFeedbackPage = () => {
    const scoreTableValue = [
        { 
          components : "Accuracy Rate",
          score: 0,
          weight: "60%",
        },
        { 
          components : "Communication",
          score: 0,
          weight: "20%",
        },
        { 
          components : "Response Rate",
          score: 0,
          weight: "20%",
        },
      ]

    return (
        <div className="w-full h-full bg-[#f2f2f7] p-0 pt-4 flex flex-col">
            <div className="flex items-center gap-x-2">
                <span className="font-medium text-base text-[#AEAEB2]">AI Mocking Interview</span>
                <i className="pi pi-chevron-right text-[#AEAEB2]"></i>
                <span className="font-medium text-base">Interview feedback</span>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-3xl font-semibold my-4">Interview feedback</div>
                <button
                    type="button"
                    className={`py-3.5 px-[60px] rounded-xl bg-[#007AFF] transition-all duration-200 ease-in-out transform hover:bg-[#005ABD]`}
                    >
                    <span className="text-white text-medium text-base">Redo interview</span>
                </button>
            </div>

            <div className="flex w-full h-[145rem] mt-4 justify-between gap-x-4">
                <div className="flex flex-col">
                    <div className="bg-white h-28 bg-white p-4 rounded-lg">
                        {/** TODO: Fetch data based on interview id and fill iin here */}
                        <span className="font-semibold text-xl text-[#191919]">Senior Software Developer</span>
                        <div className="flex gap-x-5 items-center mt-2">
                            <div className="py-2 px-4 w-fit rounded-xl" style={{background: '#FFF6D1', color: "#D9AE00"}}>
                            <span className="font-medium text-xs">Technical</span>
                            </div>

                            <span className="text-sm font-medium">06/02/2024</span>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white rounded-lg mt-6 p-4 h-60">
                        <span className="font-semibold text-xl text-[#191919]">Performance score</span>
                        <div className="flex justify-center">
                            <Gauge value={680} label="Good job!" className={"mt-5 size-60"} valueClassName={"text-[40px] mt-0"} labelClassName={"mt-0"}/>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white rounded-lg p-4 mt-6">
                        <span className="font-semibold text-xl text-[#191919]">Components score</span>
                        <DataTable value={scoreTableValue} pt={{
                            root: {className: "w-80 mt-7"},
                            headerrow: {className: "font-medium text-base text-[#191919]"}
                        }}>
                            <Column field="components" header="Components" pt={{
                            headerCell: {
                                style: {
                                background: "#E5E5EA",
                                borderBottom: 1,
                                borderBottomColor: "#E5E5EA",
                                },
                            },
                            bodyCell: {
                                className: 'font-medium text-base text-[#8E8E93]'
                            }
                            }}></Column>
                            <Column field="score" header="Score" pt={{
                            headerCell: {
                                style: {
                                background: "#E5E5EA",
                                borderBottom: 1,
                                borderBottomColor: "#E5E5EA",
                                },
                            },
                            bodyCell: {
                                className: 'font-medium text-base text-[#8E8E93]'
                            }
                            }}></Column>
                            <Column field="weight" header="Weight" pt={{
                            headerCell: {
                                style: {
                                background: "#E5E5EA",
                                borderBottom: 1,
                                borderBottomColor: "#E5E5EA",
                                },
                            },
                            bodyCell: {
                                className: 'font-medium text-base text-[#8E8E93]'
                            }
                            }}></Column>
                        </DataTable>
                    </div>
                </div>

                <div id="feedback-container" className="flex-grow p-4 bg-white rounded-lg h-full">
                    <span className="font-semibold text-xl text-[#191919]">Feedbacks</span>
                </div>
            </div>
        </div>
    )
}