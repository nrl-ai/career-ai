import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@career-ai/ui";
import TextInput, { TextInputDrag } from "./ui/TextInput";
import { useBoardStore } from "../store/BoardStore";
import { useDialog } from "@/client/stores/dialog";
import { Plus } from "@phosphor-icons/react";
import { BoardTypes } from "../types";
import { createBoard, createColumn } from "../utility";

interface EditBoardModalProps {
  children: ReactNode;
  activeBoard: BoardTypes;
  hideBoardOptions?: Dispatch<SetStateAction<boolean>>;
}

const EditBoardModal = () => {
  const { boards, activeBoardId, updateBoard } = useBoardStore();
  const activeBoard = boards.find(({ id }) => id === activeBoardId);
  const { isOpen, mode, payload, close, open } = useDialog("job-board");
  const isUpdate = mode === "update";
  const isCreate = mode === "create";

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
          <DialogTitle>
            {isUpdate ? "Edit Board" : isCreate ? "Create New Board" : "Edit Board"}
          </DialogTitle>
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
        {/* <DialogFooter></DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default EditBoardModal;
