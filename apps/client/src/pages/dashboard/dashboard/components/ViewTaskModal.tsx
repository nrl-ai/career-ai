import { FC, ReactNode, useEffect, useState } from "react";
import styles from "../styles/components/ui/Modal.module.scss";

import { useBoardStore } from "../store/BoardStore";

import { ColumnTypes, KanbanTypes, TaskTypes } from "../types";
import SubtaskCheckbox from "./ui/SubtaskCheckbox";

import { useDialog } from "@/client/stores/dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@career-ai/ui";
import Options from "./Options";

interface ViewTaskModalProps {
  children: ReactNode;
  activeTask: TaskTypes;
  activeColumn: ColumnTypes;
}

const ViewTaskModal: FC<ViewTaskModalProps> = ({ children, activeTask, activeColumn }) => {
  const { isOpen: isModalOpen, close } = useDialog("view-task");
  const { boards, activeBoardId, moveTask, toggleSubtaskCompletion } = useBoardStore();
  const activeBoard = boards.find(({ id }) => id === activeBoardId);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedDropdownValue, setSelectedDropdownValue] = useState(activeColumn.title);

  useEffect(() => {
    if (!isOpen && selectedDropdownValue !== activeColumn.title) {
      const selectedColumn = activeBoard?.columns.find(
        (column) => column.title === selectedDropdownValue,
      );

      if (selectedColumn && activeBoard) {
        const taskIndex = activeColumn.tasks.findIndex((task) => task.id === activeTask.id);

        moveTask(activeBoard.id, activeColumn.id, selectedColumn.id, taskIndex, 0);
      }
    }
  }, [isOpen]);

  const handleDropdownChange = (value: string) => {
    setSelectedDropdownValue(value);
  };

  const selectItems = activeBoard ? activeBoard.columns : [];

  return (
    <>
      <div className={styles.CurrentBoard}>{children}</div>
      <Dialog open={isModalOpen} onOpenChange={close}>
        <DialogContent closeButtonClassName="hidden">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <div className="max-w-[90%] overflow-hidden m-0 text-[var(--color)]">
                {activeTask.title}
              </div>

              <Options
                activeBoard={activeBoard!}
                activeTask={activeTask}
                activeColumn={activeColumn}
                optionsType={KanbanTypes.Task}
              />
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <label htmlFor="Subtask Number">Tasks</label>
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
          <Select
            value={selectedDropdownValue}
            onValueChange={(value) => setSelectedDropdownValue(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {selectItems.map((column) => {
                return (
                  <SelectItem key={column.id} value={column.title}>
                    {column.title}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewTaskModal;
