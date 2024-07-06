"use client";

import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import styles from "../styles/components/ui/Modal.module.scss";

import * as Dialog from "@radix-ui/react-dialog";

import TextInput, { TextInputDrag } from "./ui/TextInput";

import Button, { ButtonVariant } from "./ui/Button";
import { useBoardStore } from "../store/BoardStore";

import { createBoard, createColumn } from "../utility";
import { BoardTypes } from "../types";

interface EditBoardModalProps {
  children: ReactNode;
  activeBoard: BoardTypes;
  hideBoardOptions?: Dispatch<SetStateAction<boolean>>;
}

const EditBoardModal: FC<EditBoardModalProps> = ({
  children,
  activeBoard,
  hideBoardOptions,
}) => {
  const { updateBoard } = useBoardStore();

  const [changedBoardName, setBoardName] = useState("");
  const [columnName, setColumnName] = useState("");

  const [columns, setColumns] = useState(activeBoard.columns);

  const handleAddBoard = () => {
    const validColumns = columns.filter((column) => column.title !== "");

    const boardName = changedBoardName || activeBoard.title;
    const updatedBoard = createBoard(boardName, validColumns, activeBoard.id);

    if (boardName) {
      updateBoard(updatedBoard);
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

  const handleColumnNameChange =
    (columnId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedColumns = columns.map((column) =>
        column.id === columnId ? { ...column, title: e.target.value } : column
      );
      setColumns(updatedColumns);
    };

  return (
    <Dialog.Root onOpenChange={hideBoardOptions}>
      <Dialog.Trigger asChild aria-label="Add New Board">
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title className={styles.DialogTitle}>Edit Board</Dialog.Title>
          <div className={styles.ModalItem}>
            <label htmlFor="Board Name">Board Name</label>
            <TextInput
              placeholder="e.g. Web Design"
              defaultValue={activeBoard.title}
              onChange={(event) => setBoardName(event.target.value)}
            />
          </div>

          <div className={styles.ModalItem}>
            <label htmlFor="Board Columns">Board Columns</label>

            <div className={styles.ItemsList}>
              {columns.map((column) => (
                <TextInputDrag
                  key={column.id}
                  placeholder={
                    column.title ? `e.g. ${column.title}` : "e.g. Column Name"
                  }
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
            <Button onClick={handleAddBoard}>Save Changes</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditBoardModal;
