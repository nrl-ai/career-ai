import { useDialog } from "@/client/stores/dialog";
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
import { ColumnTypes } from "../types";
import { createSubtask, createTask } from "../utility";
import TextInput, { TextArea, TextInputDrag } from "./ui/TextInput";

const TaskModal = () => {
  const { isOpen, close } = useDialog("add-task");
  const { boards, activeBoardId, addTask } = useBoardStore();
  const activeBoard = boards.find(({ id }) => id === activeBoardId);

  const { columns } = activeBoard!;
  const [taskName, setTaskName] = useState("");
  const [subtaskName, setSubtaskName] = useState("");
  const [description, setDescription] = useState("");

  const [selectedDropdownValue, setSelectedDropdownValue] = useState(columns[0].title);

  const [subtasks, setSubtasks] = useState([createSubtask("")]);

  const handleAddTask = () => {
    if (!columns.length) return null;

    const validSubtasks = subtasks.filter((subtask) => subtask.title !== "");

    const selectedColumn = columns.find(
      (column: ColumnTypes) => column.title === selectedDropdownValue,
    );
    const newTask = createTask(taskName, description, validSubtasks);

    if (newTask && selectedColumn) {
      addTask(activeBoardId, selectedColumn.id, newTask);
    }
    close();
    return null;
  };

  const handleAddSubtask = () => {
    const newSubtask = createSubtask(subtaskName);
    setSubtasks([...subtasks, newSubtask]);
  };

  const handleRemoveSubtask = (subtaskId: string) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== subtaskId));
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleSubtaskNameChange =
    (subtaskId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedSubtasks = subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, title: event.target.value } : subtask,
      );
      setSubtasks(updatedSubtasks);
    };
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Job</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <label htmlFor="Task Name">Title</label>
          <TextInput onChange={handleTaskNameChange} placeholder="" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="Task Description">Description</label>
          <TextArea placeholder="" onChange={handleDescriptionChange} />
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
        <Button onClick={handleAddTask}>Create Task</Button>
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

export default TaskModal;
