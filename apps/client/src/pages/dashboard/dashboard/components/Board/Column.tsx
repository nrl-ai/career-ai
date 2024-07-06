import React, { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styles from "../../styles/components/board/Column.module.scss";
import { ColumnTypes, KanbanTypes } from "../../types";
import Task from "./Task";
import ViewTaskModal from "../ViewTaskModal";
import ColorPicker from "../ColorPicker";
import { useBoardStore } from "../../store/BoardStore";
import AddNewTaskModal from "../AddNewTaskModal";

interface ColumnProps {
  index: number;
  column: ColumnTypes;
}

const Column: FC<ColumnProps> = ({ column, index }) => {
  const { boards, activeBoardId, moveTask, moveColumn } = useBoardStore();

  const activeBoard = boards.find(({ id }) => id === activeBoardId);
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided: any, snapshot: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={styles.ColumnContainer}
        >
          <div
            className={
              snapshot.isDragging ? styles.IsDragging : styles.isSleeping
            }
          >
            <div className={styles.ColumnHeader}>
              <ColorPicker key={column.id} columnId={column.id} />
              <h4
                className={
                  snapshot.isDragging ? styles.IsDragging : styles.isSleeping
                }
                {...provided.dragHandleProps}
                aria-label={`${column.title} tasks list`}
              >
                {column.title} ({column.tasks.length})
              </h4>
            </div>

            <Droppable droppableId={column.id} type={KanbanTypes.Task}>
              {(provided: any) => (
                <div
                  className={styles.TasksList}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {column.tasks.map((task, index) => (
                    <ViewTaskModal
                      key={task.id}
                      activeTask={task}
                      activeColumn={column}
                    >
                      <button>
                        <Task
                          key={task.id}
                          task={task}
                          index={index}
                          {...task}
                        />
                      </button>
                    </ViewTaskModal>
                  ))}
                  {provided.placeholder}
                  {activeBoard && (
                    <AddNewTaskModal activeBoard={activeBoard}>
                      + task
                    </AddNewTaskModal>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
