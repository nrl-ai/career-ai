import { Checkbox } from "primereact/checkbox"
import { useState } from "react"

type Props = {
    finishedQuestion: {"question": string, "finished" : boolean} | undefined,
    setFinishedQuestions: (value: {"question": string, "finished" : boolean}) => void,
}

export const QuestionCheckBox = ({finishedQuestion ,setFinishedQuestions} : Props) => {
    const finished = finishedQuestion != undefined ? finishedQuestion["finished"] : false;
    const question = finishedQuestion != undefined ? finishedQuestion["question"] : "";
    return (
        <div className="flex py-5 px-3 w-full gap-x-3 border-b-2 border-b-[#d1d1d6]">
            <Checkbox checked={finished} onClick={()=>console.log('click')} pt={{
                box: {
                    className: `${finished ? 'bg-[#d9ebff] border-transparent' : 'border-[#191919] bg-white' }`
                },
                icon: {
                    className: "text-[#007aff]"
                },
                root: {
                    style: {
                        pointerEvents: "none",
                        cursor: "not-allowed",
                    }
                }
            }}/>
            <span className={`font-medium text-sm ${finished ? 'text-[#8e8e93]' : 'text-[#191919]'} max-h-[10vh] overflow-y-auto`}>
                {question}
            </span>
        </div>
    )
}