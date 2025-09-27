import { useDialog, useDialogStore } from "@/client/stores/dialog";
import {
  Button,
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
import { Plus } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useBoardStore } from "../store/BoardStore";
import styles from "../styles/components/ui/Modal.module.scss";
import { SubtaskTypes } from "../types";
import { createSubtask } from "../utility";
import TextInput, { TextArea, TextInputDrag } from "./ui/TextInput";

const EditTaskModal = () => {
  const { isOpen, close } = useDialog("edit-task");
  const { activeColumn, activeTask } = useDialogStore(
    (state) => state.dialog?.payload?.item,
  ) as any;
  const { boards, activeBoardId, updateTask, moveTask } = useBoardStore();
  const activeBoard = boards.find(({ id }) => id === activeBoardId)!;
  const { columns } = activeBoard!;

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
      close();
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
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <label htmlFor="Task Name">Title</label>
          <TextInput onChange={handleTaskNameChange} placeholder="" defaultValue={taskName} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="Task Description">Description</label>
          <TextArea placeholder="" onChange={handleDescriptionChange} defaultValue={description} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="Subtasks">Tasks</label>

          <div className={styles.ItemsList}>
            {subtasks.map((subtask) => (
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

        <Button variant={"ghost"} onClick={handleAddSubtask}>
          <Plus /> Add New Task
        </Button>
        <Button onClick={handleAddTask}>Save Changes</Button>
        <Select
          value={selectedDropdownValue}
          onValueChange={(value) => setSelectedDropdownValue(value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {columns.map((column) => {
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
  );
};

export default EditTaskModal;
