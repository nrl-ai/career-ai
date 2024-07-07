"use client";

import React, { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import styles from "../styles/components/ui/Modal.module.scss";

import * as Dialog from "@radix-ui/react-dialog";

import TextInput, { TextArea, TextInputDrag } from "./ui/TextInput";

import Button, { ButtonVariant } from "./ui/Button";
import { useBoardStore } from "../store/BoardStore";

import { createBoard, createColumn, createSubtask, createTask } from "../utility";
import { BoardTypes, ColumnTypes, SubtaskTypes, TaskTypes } from "../types";
import Dropdown from "./ui/Dropdown";

interface EditTaskModalProps {
  children: ReactNode;
  activeBoard: BoardTypes;
  activeTask: TaskTypes;
  activeColumn: ColumnTypes;
  hideBoardOptions: Dispatch<SetStateAction<boolean>>;
}

const EditTaskModal: FC<EditTaskModalProps> = ({
  children,
  activeBoard,
  activeTask,
  activeColumn,
  hideBoardOptions,
}) => {
  const { updateTask, moveTask } = useBoardStore();

  const { columns } = activeBoard;
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(activeColumn.title);

  const [taskName, setTaskName] = useState(activeTask.title);
  const [subtasks, setSubtasks] = useState(activeTask.subtasks);
  const [subtaskName, setSubtaskName] = useState("");
  const [description, setDescription] = useState(activeTask.description);

  const handleAddTask = () => {
    const validSubtasks = subtasks.filter((subtask) => subtask.title !== "");
    const selectedColumn = columns.find((column) => column.title === selectedDropdownValue);

    if (selectedColumn) {
      const updatedTask = {
        ...activeTask,
        title: taskName,
        subtasks: validSubtasks,
        description,
      };

      updateTask(activeColumn.id, updatedTask);

      if (selectedColumn.id !== activeColumn.id) {
        const sourceColumnIndex = columns.findIndex((column) => column.id === activeColumn.id);
        const destinationColumnIndex = columns.findIndex(
          (column) => column.id === selectedColumn.id,
        );

        const taskIndex = activeColumn.tasks.findIndex((task) => task.id === activeTask.id);

        moveTask(
          activeBoard.id,
          activeColumn.id,
          selectedColumn.id,
          taskIndex,
          destinationColumnIndex,
        );
      }
    }
  };
  const handleSubtaskNameChange =
    (subtaskId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedSubtasks = subtasks.map((subtask: SubtaskTypes) =>
        subtask.id === subtaskId ? { ...subtask, title: event.target.value } : subtask,
      );
      setSubtasks(updatedSubtasks);
    };

  const handleAddSubtask = () => {
    const newSubtask = createSubtask(subtaskName);
    setSubtasks([...subtasks, newSubtask]);
  };

  const handleRemoveSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.filter((subtask: SubtaskTypes) => subtask.id !== subtaskId));
  };

  const handleDropdownChange = (value: string) => {
    setSelectedDropdownValue(value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  return (
    <Dialog.Root onOpenChange={hideBoardOptions}>
      <Dialog.Trigger asChild aria-label="Add New Board">
        <div className={styles.CurrentBoard}>{children}</div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>Edit Task</Dialog.Title>
          <div className={styles.ModalItem}>
            <label htmlFor="Task Name">Title</label>
            <TextInput onChange={handleTaskNameChange} placeholder="" defaultValue={taskName} />
          </div>

          <div className={styles.ModalItem}>
            <label htmlFor="Task Description">Description</label>
            <TextArea
              placeholder=""
              onChange={handleDescriptionChange}
              defaultValue={description}
            />
          </div>
          <div className={styles.ModalItem}>
            <label htmlFor="Subtasks">Tasks</label>

            <div className={styles.ItemsList}>
              {subtasks.map((subtask: SubtaskTypes) => (
                <TextInputDrag
                  key={subtask.id}
                  placeholder=""
                  defaultValue={subtask.title}
                  onChange={handleSubtaskNameChange(subtask.id)}
                  remove={() => handleRemoveSubtask(subtask.id)}
                />
              ))}
            </div>
          </div>
          <Button variant={ButtonVariant.Secondary} onClick={handleAddSubtask}>
            + Add New Task
          </Button>
          <Dropdown
            items={columns}
            onChange={handleDropdownChange}
            defaultValue={selectedDropdownValue}
          />
          <Dialog.Close asChild>
            <Button onClick={handleAddTask}>Save Changes</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditTaskModal;
