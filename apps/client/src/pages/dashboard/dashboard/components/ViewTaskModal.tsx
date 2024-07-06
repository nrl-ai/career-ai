"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import styles from "../styles/components/ui/Modal.module.scss";

import * as Dialog from "@radix-ui/react-dialog";

import { useBoardStore } from "../store/BoardStore";

import Dropdown from "./ui/Dropdown";
import { ColumnTypes, KanbanTypes, TaskTypes } from "../types";
import SubtaskCheckbox from "./ui/SubtaskCheckbox";

import Options from "./Options";

interface ViewTaskModalProps {
  children: ReactNode;
  activeTask: TaskTypes;
  activeColumn: ColumnTypes;
}

const ViewTaskModal: FC<ViewTaskModalProps> = ({
  children,
  activeTask,
  activeColumn,
}) => {
  const { boards, activeBoardId, moveTask, toggleSubtaskCompletion } =
    useBoardStore();
  const activeBoard = boards.find(({ id }) => id === activeBoardId);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedDropdownValue, setSelectedDropdownValue] = useState(
    activeColumn.title
  );

  useEffect(() => {
    if (!isOpen && selectedDropdownValue !== activeColumn.title) {
      const selectedColumn = activeBoard?.columns.find(
        (column) => column.title === selectedDropdownValue
      );

      if (selectedColumn && activeBoard) {
        const taskIndex = activeColumn.tasks.findIndex(
          (task) => task.id === activeTask.id
        );

        moveTask(
          activeBoard.id,
          activeColumn.id,
          selectedColumn.id,
          taskIndex,
          0
        );
      }
    }
  }, [isOpen]);

  const handleDropdownChange = (value: string) => {
    setSelectedDropdownValue(value);
  };

  return (
    <Dialog.Root onOpenChange={(open) => setIsOpen(open)}>
      <Dialog.Trigger asChild aria-label="View Task">
        <div className={styles.CurrentBoard}>{children}</div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <div className={styles.TitleWithIcon}>
            <Dialog.Title className={styles.DialogTitle}>
              {activeTask.title}
            </Dialog.Title>

            <Options
              activeBoard={activeBoard!}
              activeTask={activeTask}
              activeColumn={activeColumn}
              optionsType={KanbanTypes.Task}
            />
          </div>

          <Dialog.Description>{activeTask.description}</Dialog.Description>
          <div className={styles.ModalItem}>
            <label htmlFor="Subtask Number">Subtask</label>
            {activeTask.subtasks.map((subtask) => (
              <SubtaskCheckbox
                key={subtask.id}
                label={subtask.title}
                completed={subtask.completed}
                onChange={() => {
                  toggleSubtaskCompletion(activeTask.id, subtask.id);
                }}
              />
            ))}
          </div>

          <Dropdown
            items={activeBoard ? activeBoard.columns : []}
            onChange={handleDropdownChange}
            defaultValue={selectedDropdownValue}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ViewTaskModal;
