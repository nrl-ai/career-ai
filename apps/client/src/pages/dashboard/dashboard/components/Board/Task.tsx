import classNames from "classnames";
import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "../../styles/components/board/Task.module.scss";
import { TaskTypes } from "../../types";
import { cn } from "@career-ai/utils";
interface TaskProps extends TaskTypes {
  index: number;
  task: TaskTypes;
}

const Task: FC<TaskProps> = ({ task, index }) => {
  const completedSubtasks = task.subtasks.filter((subtask) => subtask.completed).length;

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided: any, snapshot: any) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={cn(
              classNames(styles.Task, snapshot.isDragging ? styles.IsDragging : styles.IsSleeping),
              "p-2",
            )}
          >
            <h3 className={styles.Title}>{task.title}</h3>
            {/* <p className={styles.SubtaskNumber}>
              {completedSubtasks} of {task.subtasks.length} tasks
            </p> */}
            {/* {task?.resume && <p className="mt-1 text-xs">Applied Resume: {task?.resume?.title}</p>} */}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
