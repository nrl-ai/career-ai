import { t } from "@lingui/macro";
import { KeyboardShortcut } from "@career-ai/ui";
import { useDialog } from "@/client/stores/dialog";

import { BaseCard } from "./base-card";

export const ImportResumeCard = () => {
  const { open } = useDialog("import");

  return (
    <BaseCard
      className="flex items-center justify-center border-dashed border-blue-500 bg-blue-100 text-blue-500"
      onClick={() => {
        open("create");
      }}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <img src="/icons/upload.svg" alt="Create a new resume" className="w-12 h-12 mx-auto" />
        <h4 className="text-gray-600 font-bold mt-8">
          {t`Import an existing resume`}
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <KeyboardShortcut className="ml-2">^I</KeyboardShortcut>
        </h4>
        <p className="text-xs opacity-75 text-gray-600 mt-2">{t`LinkedIn, JSON Resume, etc.`}</p>
      </div>
    </BaseCard>
  );
};
