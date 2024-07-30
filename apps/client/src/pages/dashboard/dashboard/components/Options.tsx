import { updateJobApplications } from "@/client/services/job-applications";
import { useDialog } from "@/client/stores/dialog";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@career-ai/ui";
import { FC, useState } from "react";
import { sampleData, sampleEmptyData } from "../store/boards";
import styles from "../styles/components/BoardOptions.module.scss";
import { BoardTypes, ColumnTypes, KanbanTypes, TaskTypes } from "../types";
import { VerticalEllipsisIcon } from "./icons";

interface OptionsProps {
  activeBoard: BoardTypes;
  activeColumn?: ColumnTypes;
  activeTask?: TaskTypes;
  optionsType: string;
}

const Options: FC<OptionsProps> = ({ activeBoard, optionsType, activeColumn, activeTask }) => {
  const { open } = useDialog("job-board");
  const { open: openEditModal } = useDialog("edit-task");
  const { open: openDeleteModal } = useDialog("warning");
  const [isOpen, setIsOpen] = useState(false);
  const fillBoardWithExamples = async () => {
    await updateJobApplications(sampleData);
    window.location.reload();
  };
  const fillBoardWithEmpty = async () => {
    await updateJobApplications(sampleEmptyData);
    window.location.reload();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className={styles.PopoverBtn}>
          <VerticalEllipsisIcon className={styles.Icon} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-2 bg-background border-gray-300">
        {optionsType === KanbanTypes.Board ? (
          <div className="flex flex-col gap-1 p-2">
            <Button
              className="w-full px-2"
              onClick={() => {
                open("update");
              }}
              variant={"secondary"}
            >
              Edit {optionsType}
            </Button>
            <Button variant={"secondary"} onClick={fillBoardWithEmpty}>
              Clear board
            </Button>
            <Button variant={"secondary"} onClick={fillBoardWithExamples}>
              Fill board with examples
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-1 bg-none">
            <Button
              variant={"secondary"}
              onClick={() => {
                openEditModal("update", {
                  id: "edit-task",
                  item: { activeTask, activeColumn },
                });
              }}
            >
              Edit {optionsType}
            </Button>
            <Button
              onClick={() => {
                openDeleteModal("update", {
                  id: "warning",
                  item: { activeColumn, activeTask, activeBoard, type: optionsType },
                });
              }}
              variant={"error"}
            >
              Delete {optionsType}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Options;
