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
                    className: "w-full absolute h-[7vh] bg-[#FF3B30] rounded-[10px] hover:bg-[#BF221A] border-none focus:shadow-none"
                },
                label: {
                    className: "font-medium text-white text-base"
                }
            }}
        />
    )
}