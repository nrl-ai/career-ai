import { DialogName, useDialog } from "@/client/stores/dialog";
import { Button } from "primereact/button";
import { MouseEventHandler } from "react";

type BaseButtonProps = {
  title: string;
  content: string;
  icon: string;
  dialog: DialogName;
  classname?: string;
};

export const BaseButton = ({ title, content, icon, dialog, classname }: BaseButtonProps) => {
  const { open } = useDialog(dialog);

  return (
    <button
      className="flex flex-col w-[18vw] h-[120px] text-[#8E8E93] bg-[#F2F2F7] justify-center items-center rounded-xl
        transition-all duration-200 ease-in-out transform hover:bg-[#D9EBFF] hover:outline hover:outline-1 hover:outline-[#007AFF] hover:text-[#007AFF]"
      onClick={() => {
        open("create");
      }}
    >
      <i className={`${icon} text-2xl font-semibold`}></i>
      <span className="font-semibold text-base">{title}</span>
      <span className="font-medium text-xs">{content}</span>
    </button>
  );
};
