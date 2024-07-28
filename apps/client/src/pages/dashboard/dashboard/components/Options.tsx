"use client";

import { updateJobApplications } from "@/client/services/job-applications";
import { useDialog } from "@/client/stores/dialog";
import * as Popover from "@radix-ui/react-popover";
import { FC, useState } from "react";
import { sampleData, sampleEmptyData } from "../store/boards";
import styles from "../styles/components/BoardOptions.module.scss";
import { BoardTypes, ColumnTypes, KanbanTypes, TaskTypes } from "../types";
import EditTaskModal from "./EditTaskModal";
import { VerticalEllipsisIcon } from "./icons";
import WarnModal from "./WarnModal";

interface OptionsProps {
  activeBoard: BoardTypes;
  activeColumn?: ColumnTypes;
  activeTask?: TaskTypes;
  optionsType: string;
}

const Options: FC<OptionsProps> = ({ activeBoard, optionsType, activeColumn, activeTask }) => {
  const { open } = useDialog("job-board");
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
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild aria-label={`${optionsType} options`}>
        <button className={styles.PopoverBtn}>
          <VerticalEllipsisIcon className={styles.Icon} />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className={styles.PopoverContent} sideOffset={10} align="end">
          {optionsType === KanbanTypes.Board ? (
            <>
              <button
                className="w-full px-2"
                onClick={() => {
                  open("update");
                }}
              >
                <h3 className={styles.Edit}>Edit {optionsType}</h3>
              </button>
              <button className="text-gray-500 pt-2" onClick={fillBoardWithEmpty}>
                <span className={styles.SpanText}>Clear board</span>
              </button>
              <button className="text-blue-500 pt-2" onClick={fillBoardWithExamples}>
                <span className={styles.SpanText}>Fill board with examples</span>
              </button>
              {/* <WarnModal type={optionsType} activeBoard={activeBoard}>
                <button className="w-full px-2">
                  <h3 className={styles.Delete}>Delete {optionsType}</h3>
                </button>
              </WarnModal> */}
            </>
          ) : (
            <>
              <EditTaskModal
                activeBoard={activeBoard}
                activeColumn={activeColumn!}
                activeTask={activeTask!}
                hideBoardOptions={setIsOpen}
              >
                <button
                  className="w-full px-2"
                  onClick={() => {
                    open("update");
                  }}
                >
                  <h3 className={styles.Edit}>Edit {optionsType}</h3>
                </button>
              </EditTaskModal>
              <WarnModal type={optionsType} activeColumn={activeColumn} activeTask={activeTask}>
                <button className="w-full px-2">
                  <h3 className={styles.Delete}>Delete {optionsType}</h3>
                </button>
              </WarnModal>
            </>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Options;
