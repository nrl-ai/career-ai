"use client";

import React, { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import styles from "../styles/components/ui/Modal.module.scss";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Tooltip,
} from "@career-ai/ui";

import TextInput, { TextInputDrag } from "./ui/TextInput";

// import Button, { ButtonVariant } from "./ui/Button";
import { useBoardStore } from "../store/BoardStore";

import { createBoard, createColumn } from "../utility";
import { BoardTypes } from "../types";
import { useDialog } from "@/client/stores/dialog";
import { Plus } from "@phosphor-icons/react";

interface EditBoardModalProps {
  children: ReactNode;
  activeBoard: BoardTypes;
  hideBoardOptions?: Dispatch<SetStateAction<boolean>>;
}

const EditBoardModal = () => {
  const { boards, activeBoardId, updateBoard } = useBoardStore();
  const activeBoard = boards.find(({ id }) => id === activeBoardId);
  const { isOpen, mode, payload, close, open } = useDialog("job-board");
  console.log("check mode", mode);

  const [changedBoardName, setBoardName] = useState("");
  const [columnName, setColumnName] = useState("");

  const [columns, setColumns] = useState(activeBoard?.columns);

  const handleAddBoard = () => {
    const validColumns = columns?.filter((column) => column.title !== "");

    const boardName = changedBoardName || (activeBoard?.title as string);
    const updatedBoard = createBoard(boardName, validColumns, activeBoard?.id);

    if (boardName) {
      updateBoard(updatedBoard);
      close();
    }
    return null;
  };

  const handleAddColumn = () => {
    const newColumn = createColumn(columnName);
    setColumns((prevCol) => (prevCol ? [...prevCol, newColumn] : [newColumn]));
  };

  const handleRemoveColumn = (columnId: string) => {
    setColumns(columns?.filter((column) => column.id !== columnId));
  };

  const handleColumnNameChange = (columnId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedColumns = columns?.map((column) =>
      column.id === columnId ? { ...column, title: e.target.value } : column,
    );
    setColumns(updatedColumns);
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <label htmlFor="Board Name">Board Name</label>
          <TextInput
            placeholder=""
            defaultValue={activeBoard?.title}
            onChange={(event) => setBoardName(event.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="Board Columns">Board Columns</label>

          <div>
            {columns?.map((column) => (
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

        <Button variant={"ghost"} onClick={handleAddColumn}>
          <Plus /> Add New Column
        </Button>
        <Button onClick={handleAddBoard}>Save Changes</Button>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBoardModal;
