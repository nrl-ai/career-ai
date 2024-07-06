"use client";

import { FC, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import styles from "../styles/components/BoardOptions.module.scss";
import { VerticalEllipsisIcon } from "./icons";
import EditBoardModal from "./EditBoardModal";
import { BoardTypes, ColumnTypes, KanbanTypes, TaskTypes } from "../types";
import WarnModal from "./WarnModal";
import EditTaskModal from "./EditTaskModal";

interface OptionsProps {
  activeBoard: BoardTypes;
  activeColumn?: ColumnTypes;
  activeTask?: TaskTypes;
  optionsType: string;
}

const Options: FC<OptionsProps> = ({ activeBoard, optionsType, activeColumn, activeTask }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild aria-label={`${optionsType} options`}>
        <button className={styles.PopoverBtn}>
          <VerticalEllipsisIcon className={styles.Icon} />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className={styles.PopoverContent} sideOffset={20} align="end">
          {optionsType === KanbanTypes.Board ? (
            <>
              <EditBoardModal activeBoard={activeBoard!} hideBoardOptions={setIsOpen}>
                <button className="w-full px-2">
                  <h3 className={styles.Edit}>Edit {optionsType}</h3>
                </button>
              </EditBoardModal>
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
                <button className="w-full px-2">
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
