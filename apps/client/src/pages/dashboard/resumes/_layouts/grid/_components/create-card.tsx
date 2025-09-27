import { t } from "@lingui/macro";
import { Plus } from "@phosphor-icons/react";
import { KeyboardShortcut } from "@career-ai/ui";
import { cn } from "@career-ai/utils";
import { useDialog } from "@/client/stores/dialog";
import { BaseCard } from "./base-card";

export const CreateResumeCard = () => {
  const { open } = useDialog("resume");

  return (
    <BaseCard
      onClick={() => {
        open("create");
      }}
      className="bg-blue-100 text-blue-500 border-2 border-dashed border-blue-500 flex items-center justify-center p-4"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <img src="/icons/plus.svg" alt="Create a new resume" className="w-12 h-12 mx-auto" />
        <h4 className="text-gray-600 font-bold mt-8">{t`Create a new resume`}</h4>
        <p className="text-xs opacity-75 text-gray-600 mt-2">
          {t`Create a new resume from templates`}
        </p>
      </div>
    </BaseCard>
  );
};
