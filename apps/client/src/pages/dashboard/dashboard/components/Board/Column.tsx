import { useDialog } from "@/client/stores/dialog";
import {
  Button,
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@career-ai/ui";
import { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useBoardStore } from "../../store/BoardStore";
import styles from "../../styles/components/board/Column.module.scss";
import { ColumnTypes, KanbanTypes } from "../../types";
import ColorPicker from "../ColorPicker";
import { PlusIcon } from "../icons";
import ViewTaskModal from "../ViewTaskModal";
import Task from "./Task";
import { GrRotateLeft } from "react-icons/gr";

interface ColumnProps {
  index: number;
  column: ColumnTypes;
}

const Column: FC<ColumnProps> = ({ column, index }) => {
  const { open } = useDialog("add-task");
  const { open: openViewTaskModal } = useDialog("view-task");
  const { open: openAddCVModal } = useDialog("add-cv");
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
          <div className={snapshot.isDragging ? styles.IsDragging : styles.isSleeping}>
            <div className={styles.ColumnHeader}>
              <ColorPicker key={column.id} columnId={column.id} />
              <h4
                className={snapshot.isDragging ? styles.IsDragging : styles.isSleeping}
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
                    <ViewTaskModal key={task.id} activeTask={task} activeColumn={column}>
                      <button
                        onClick={() => {
                          openViewTaskModal("create");
                        }}
                      >
                        <Task key={task.id} task={task} index={index} {...task} />
                      </button>
                      <TooltipProvider>
                        <TooltipRoot>
                          <TooltipTrigger>
                            {task.resume ? <Button
                              onClick={() => {
                                openAddCVModal("create", {
                                  id: "add-cv",
                                  item: { task, column },
                                });
                              }}
                              variant={"secondary"}
                              className="text-left mt-2 mb-4 w-[180px] max-w-full h-[30px] text-xs"
                            >
                              <GrRotateLeft className="pr-1 w-4 h-4" />
                              {String(task.resume.title).substring(0, 10)}...
                            </Button> : <Button
                              onClick={() => {
                                openAddCVModal("create", {
                                  id: "add-cv",
                                  item: { task, column },
                                });
                              }}
                              variant={"secondary"}
                              className="mt-2 mb-4 w-[200px] h-[30px] text-xs"
                            >
                              <PlusIcon className="pr-1 w-3 h-3" />
                              Add Resume
                            </Button>}
                          </TooltipTrigger>
                          <TooltipContent>{"Add a resume"}</TooltipContent>
                        </TooltipRoot>
                      </TooltipProvider>
                    </ViewTaskModal>
                  ))}
                  {provided.placeholder}
                  {activeBoard && (
                    <div
                      className="mt-4 cursor-pointer"
                      onClick={() => {
                        open("create");
                      }}
                    >
                      + New Job
                    </div>
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
