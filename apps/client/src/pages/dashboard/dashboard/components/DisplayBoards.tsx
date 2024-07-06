"use client";

import React, { FC } from "react";
import { BoardIcon, ChevronDownIcon } from "./icons";
import styles from "../styles/components/DisplayBoards.module.scss";
import * as Dialog from "@radix-ui/react-dialog";
import ThemeSwitch from "./ui/ThemeSwitch";
import { useBoardStore } from "../store/BoardStore";
import AddNewBoardModal from "./AddNewBoardModal";
import classNames from "classnames";
import BoardsList from "./ui/BoardsList";

const DisplayBoards: FC<{ showIcon: boolean }> = ({ showIcon }) => {
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
        <AddNewBoardModal>
          <button>
            <h2>+Create New Board</h2>
          </button>
        </AddNewBoardModal>
      )}
    </>
  );
};

export default DisplayBoards;
