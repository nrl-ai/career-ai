import { Button } from "primereact/button";

// type Props = {
//     navigate: void,

// }

export const EndInterviewButton = () => {
    return (
        <Button
            label="End interview"
            pt={{
                root: {
                    className: "w-full absolute h-[7vh] bg-[#ff3b30] rounded-[10px] hover:bg-[#bf221a] border-none focus:shadow-none",
                    // style: {
                    //     background: "#FF3B30"
                        
                    // }
                },
                label: {
                    className: "font-medium text-white text-base"
                }
            }}
        />
    )
}