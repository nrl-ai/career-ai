"use client";

import React, { FC, ReactNode, useState } from "react";
import styles from "../styles/components/ui/Modal.module.scss";

import * as Dialog from "@radix-ui/react-dialog";

import TextInput, { TextInputDrag } from "./ui/TextInput";

import Button, { ButtonVariant } from "./ui/Button";
import { useBoardStore } from "../store/BoardStore";

import { createBoard, createColumn } from "../utility";

interface AddNewBoardModalProps {
  children: ReactNode;
}

const AddNewBoardModal: FC<AddNewBoardModalProps> = ({ children }) => {
  const [boardName, setBoardName] = useState("");
  const [columnName, setColumnName] = useState("");

  const { addBoard, setActiveBoard } = useBoardStore();
  const [columns, setColumns] = useState([
    createColumn("Todo"),
    createColumn("Doing"),
    createColumn("Done"),
  ]);

  const handleAddBoard = () => {
    const validColumns = columns.filter((column) => column.title !== "");
    const newBoard = createBoard(boardName, validColumns);

    if (boardName) {
      addBoard(newBoard);
      setActiveBoard(newBoard.id);
    }
    return null;
  };

  const handleAddColumn = () => {
    const newColumn = createColumn(columnName);
    setColumns([...columns, newColumn]);
  };

  const handleRemoveColumn = (columnId: string) => {
    setColumns(columns.filter((column) => column.id !== columnId));
  };

  const handleColumnNameChange = (columnId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedColumns = columns.map((column) =>
      column.id === columnId ? { ...column, title: e.target.value } : column,
    );
    setColumns(updatedColumns);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild aria-label="Add New Board">
        <div className={styles.CurrentBoard}>{children}</div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>Add New Board</Dialog.Title>
          <div className={styles.ModalItem}>
            <label htmlFor="Board Name">Board Name</label>
            <TextInput
              placeholder="e.g. Web Design"
              value={boardName}
              onChange={(event) => setBoardName(event.target.value)}
            />
          </div>

          <div className={styles.ModalItem}>
            <label htmlFor="Board Columns">Board Columns</label>

            <div className={styles.ItemsList}>
              {columns.map((column) => (
                <TextInputDrag
                  key={column.id}
                  placeholder={column.title ? `e.g. ${column.title}` : "e.g. Column Name"}
                  defaultValue={column.title}
                  onChange={handleColumnNameChange(column.id)}
                  remove={() => handleRemoveColumn(column.id)}
                />
              ))}
            </div>
          </div>
          <Button variant={ButtonVariant.Secondary} onClick={handleAddColumn}>
            + Add New Column
          </Button>
          <Dialog.Close asChild>
            <Button onClick={handleAddBoard}>Create New Board</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddNewBoardModal;
