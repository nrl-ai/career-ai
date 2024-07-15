import { select, t } from "@lingui/macro";
import { ResumeDto } from "@career-ai/dto";
import { cn } from "@career-ai/utils";
import dayjs from "dayjs";
import { BaseCard } from "./base_card";

type Props = {
  selected: boolean;
  resume: ResumeDto;
  onClick?: () => void;
};

export const ResumeCard = ({ resume, selected, onClick }: Props) => {
  const lastUpdated = dayjs().to(resume.updatedAt);

  return (
    <div className="relative">
      <BaseCard
        onClick={onClick}
        className={cn(
          "space-y-0 overflow-hidden p-2 hover:border-[3px] border-blue-200",
          selected && "border-[3px] border-blue-500 shadow-lg shadow-blue-300/60",
          "aspect-[1/1.1]"
        )}
        template={resume.data.metadata.template}
      >
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end space-y-0.5 p-4 pt-12",
            "bg-gradient-to-t from-gray-900/90 to-transparent pt-16",
          )}
        >
          <h4 className="line-clamp-2 font-medium text-white">{resume.title}</h4>
          <p className="line-clamp-1 text-xs text-gray-100 opacity-75">{t`Last updated ${lastUpdated}`}</p>
        </div>
      </BaseCard>
    </div>
  );
};