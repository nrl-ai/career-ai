"use client";

import React, { FC, ReactNode, useState } from "react";
import styles from "../styles/components/ui/Modal.module.scss";

import * as Dialog from "@radix-ui/react-dialog";

import Button, { ButtonVariant } from "./ui/Button";
import { useBoardStore } from "../store/BoardStore";

import { BoardTypes, ColumnTypes, KanbanTypes, TaskTypes } from "../types";
import classNames from "classnames";

interface WarnModalProps {
  type: string;
  activeBoard?: BoardTypes;
  activeColumn?: ColumnTypes;
  activeTask?: TaskTypes;
  children: ReactNode;
}

const WarnModal: FC<WarnModalProps> = ({
  children,
  type,
  activeBoard,
  activeColumn,
  activeTask,
}) => {
  const { removeBoard, removeTask } = useBoardStore();
  const handleRemove = () => {
    if (type === KanbanTypes.Board && activeBoard) {
      removeBoard(activeBoard.id);
    }

    if (type === KanbanTypes.Task && activeColumn && activeTask) {
      removeTask(activeColumn.id, activeTask.id);
    }
  };

  return (
    <Dialog.Root defaultOpen={false}>
      <Dialog.Trigger asChild aria-label={`Add New ${type}`}>
        <div className={styles.CurrentBoard}>{children}</div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={classNames(styles.DialogTitle, styles.Warn)}>
            Delete this {type}?
          </Dialog.Title>

          <div className={styles.ModalItem}>
            <p>
              {` Are you sure you want to delete the '${
                type == KanbanTypes.Board
                  ? activeBoard?.title
                  : activeTask?.title
              }' ${type}?
              This action will remove all columns and tasks and cannot be
              reversed.`}
            </p>
          </div>
          <Button variant={ButtonVariant.Destructive} onClick={handleRemove}>
            Delete
          </Button>
          <Dialog.Close asChild>
            <Button variant={ButtonVariant.Secondary}>Cancel</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default WarnModal;
