import { ResumeDto } from "@career-ai/dto";

export interface IconProps {
  className?: string;
  onClick?: () => void;
}

export interface SubtaskTypes {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskTypes {
  id: string;
  title: string;
  description: string;
  subtasks: SubtaskTypes[];
  resume?: ResumeDto;
}

export interface ColumnTypes {
  id: string;
  title: string;
  ovalColor: string;
  tasks: TaskTypes[] | [];
}

export interface BoardTypes {
  id: string;
  title: string;
  columns: ColumnTypes[];
}

export enum KanbanTypes {
  Board = "Board",
  Column = "Column",
  Task = "Job",
  Subtask = "Task",
}
