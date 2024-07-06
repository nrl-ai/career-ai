import { TaskTypes } from "../../types";
import React, { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "../../styles/components/board/Task.module.scss";
import classNames from "classnames";
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
            className={classNames(
              styles.Task,
              snapshot.isDragging ? styles.IsDragging : styles.IsSleeping,
            )}
          >
            <h3 className={styles.Title}>{task.title}</h3>
            <p className={styles.SubtaskNumber}>
              {completedSubtasks} of {task.subtasks.length} tasks
            </p>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Task;
