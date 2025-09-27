"use client";

import { useDialog } from "@/client/stores/dialog";
import * as Dialog from "@radix-ui/react-dialog";
import { FC } from "react";
import { useBoardStore } from "../store/BoardStore";
import styles from "../styles/components/DisplayBoards.module.scss";
import { ChevronDownIcon } from "./icons";
import BoardsList from "./ui/BoardsList";

const DisplayBoards: FC<{ showIcon: boolean }> = ({ showIcon }) => {
  const { open } = useDialog("job-board");
  const { setActiveBoard } = useBoardStore();
  const boards = useBoardStore((state) => state.boards);

  const activeBoardId = useBoardStore((state) => state.activeBoardId);

  const activeBoard = boards.find(({ id }) => id === activeBoardId);

  return (
    <>
      {boards.length ? (
        <Dialog.Root>
          <div className={styles.CurrentBoard}>
            <h1 className={styles.BoardTitle}>
              {activeBoard ? activeBoard.title : "No board selected"}
            </h1>
            <Dialog.Trigger aria-label="Display Boards">
              {showIcon && <ChevronDownIcon className={styles.ChevronIcon} />}
            </Dialog.Trigger>
          </div>

          <Dialog.Portal>
            <Dialog.Overlay className={styles.DialogOverlay} />
            <Dialog.Content className={styles.DialogContent}>
              <BoardsList />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ) : (
        <button
          onClick={() => {
            open("create");
          }}
        >
          <h2>+Create New Board</h2>
        </button>
      )}
    </>
  );
};

export default DisplayBoards;
