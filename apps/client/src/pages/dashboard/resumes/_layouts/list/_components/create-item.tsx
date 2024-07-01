import { t } from "@lingui/macro";
import { Plus } from "@phosphor-icons/react";
import { ResumeDto } from "@career-ai/dto";
import { KeyboardShortcut } from "@career-ai/ui";

import { useDialog } from "@/client/stores/dialog";

import { BaseListItem } from "./base-item";

export const CreateResumeListItem = () => {
  const { open } = useDialog<ResumeDto>("resume");

  return (
    <BaseListItem
      start={<Plus size={18} />}
      title={
        <>
          <span>{t`Create a new resume`}</span>
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <KeyboardShortcut className="ml-2">^N</KeyboardShortcut>
        </>
      }
      description={t`Create a new resume`}
      onClick={() => {
        open("create");
      }}
    />
  );
};
