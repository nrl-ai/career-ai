import { Button } from "primereact/button";

type Props = {
  navigate: () => void;
};

export const EndInterviewButton = ({ navigate }: Props) => {
  return (
    <Button
      label="End interview"
      pt={{
        root: {
          className:
            "w-full absolute h-[5vh] bg-[#ff3b30] rounded-xl hover:bg-[#bf221a] border-none focus:shadow-none",
        },
        label: {
          className: "font-medium text-white text-base",
        },
      }}
      onClick={navigate}
    />
  );
};
