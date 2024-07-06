"use client";

import React, { FC, ReactNode, useState } from "react";
import styles from "../styles/components/ui/Modal.module.scss";

import * as Dialog from "@radix-ui/react-dialog";

import TextInput, { TextArea, TextInputDrag } from "./ui/TextInput";

import Button, { ButtonVariant } from "./ui/Button";
import { useBoardStore } from "../store/BoardStore";

import { createTask, createColumn, createSubtask } from "../utility";
import Dropdown from "./ui/Dropdown";
import { BoardTypes, ColumnTypes } from "../types";

interface AddNewTaskModalProps {
  children: ReactNode;
  activeBoard: BoardTypes;
}

const AddNewTaskModal: FC<AddNewTaskModalProps> = ({
  children,
  activeBoard,
}) => {
  const [taskName, setTaskName] = useState("");
  const [subtaskName, setSubtaskName] = useState("");
  const [description, setDescription] = useState("");
  const { addTask, activeBoardId } = useBoardStore();

  const { columns } = activeBoard;
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(
    columns[0].title
  );

  const [subtasks, setSubtasks] = useState([createSubtask("")]);

  const handleAddTask = () => {
    if (!columns.length) return null;

    const validSubtasks = subtasks.filter((subtask) => subtask.title !== "");

    const selectedColumn = columns.find(
      (column: ColumnTypes) => column.title === selectedDropdownValue
    );
    const newTask = createTask(taskName, description, validSubtasks);

    if (newTask && selectedColumn) {
      addTask(activeBoardId, selectedColumn.id, newTask);
    }
    return null;
  };

  const handleAddSubtask = () => {
    const newSubtask = createSubtask(subtaskName);
    setSubtasks([...subtasks, newSubtask]);
  };

  const handleRemoveSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId));
  };

  const handleDropdownChange = (value: string) => {
    setSelectedDropdownValue(value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleSubtaskNameChange =
    (subtaskId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedSubtasks = subtasks.map((subtask) =>
        subtask.id === subtaskId
          ? { ...subtask, title: event.target.value }
          : subtask
      );
      setSubtasks(updatedSubtasks);
    };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild aria-label="Add New Task">
        <div className={styles.CurrentBoard}>{children}</div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>
            Add New Task
          </Dialog.Title>
          <div className={styles.ModalItem}>
            <label htmlFor="Task Name">Title</label>
            <TextInput
              onChange={handleTaskNameChange}
              placeholder="e.g. Take coffee break"
            />
          </div>

          <div className={styles.ModalItem}>
            <label htmlFor="Task Description">Description</label>
            <TextArea
              placeholder="e.g. It’s always good to take a break. This 
15 minute break will  recharge the batteries 
a little."
              onChange={handleDescriptionChange}
            />
          </div>

          <div className={styles.ModalItem}>
            <label htmlFor="Subtasks">Subtasks</label>

            <div className={styles.ItemsList}>
              {subtasks.map((subtask) => (
                <TextInputDrag
                  key={subtask.id}
                  placeholder={
                    subtask.title ? `e.g. ${subtask.title}` : "e.g. Make coffee"
                  }
                  defaultValue={subtask.title}
                  onChange={handleSubtaskNameChange(subtask.id)}
                  remove={() => handleRemoveSubtask(subtask.id)}
                />
              ))}
            </div>
          </div>
          <Button variant={ButtonVariant.Secondary} onClick={handleAddSubtask}>
            + Add New Subtask
          </Button>
          <Dialog.Close asChild>
            <Button onClick={handleAddTask}>Create Task</Button>
          </Dialog.Close>
          <Dropdown
            items={columns}
            onChange={handleDropdownChange}
            defaultValue={selectedDropdownValue}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddNewTaskModal;
