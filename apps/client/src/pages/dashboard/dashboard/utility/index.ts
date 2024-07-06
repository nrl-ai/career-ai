import { v4 as uuidv4 } from "uuid";
import { BoardTypes, ColumnTypes, SubtaskTypes, TaskTypes } from "../types";

export const createBoard = (
  title: string,
  columns: ColumnTypes[] = [],
  passedId?: string
): BoardTypes => {
  const id = passedId || uuidv4();
  return { id, title, columns };
};

export const createColumn = (title: string): ColumnTypes => {
  const id = uuidv4();
  const tasks: TaskTypes[] = [];
  const ovalColor = "#49c4e5";
  return { title, id, tasks, ovalColor };
};

export const createTask = (
  title: string,
  description: string,
  subtasks: SubtaskTypes[] = []
): TaskTypes => {
  const id = uuidv4();

  return { title, id, description, subtasks };
};

export const createSubtask = (title: string): SubtaskTypes => {
  const id = uuidv4();
  const completed = false;

  return { title, id, completed };
};
