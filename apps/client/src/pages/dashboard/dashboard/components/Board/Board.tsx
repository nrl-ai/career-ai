"use client";

import { useDialog } from "@/client/stores/dialog";
import { FC } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useBoardStore } from "../../store/BoardStore";
import styles from "../../styles/components/board/Board.module.scss";
import { KanbanTypes } from "../../types";
import DisplayBoards from "../DisplayBoards";
import Button, { ButtonVariant } from "../ui/Button";
import Column from "./Column";

interface BoardProps {
  displayedSideMenu: boolean;
}

const Board: FC<BoardProps> = ({ displayedSideMenu }) => {
  const { boards, activeBoardId, moveTask, moveColumn } = useBoardStore();
  const { open } = useDialog("job-board");
  const activeBoard = boards.find(({ id }) => id === activeBoardId);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId && source.index === destination.index)
    ) {
      return;
    }

    if (type === KanbanTypes.Task) {
      moveTask(
        activeBoardId,
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
      );
    } else if (type === KanbanTypes.Column) {
      moveColumn(activeBoardId, source.index, destination.index);
    }
  };

  return activeBoard ? (
    <div className={styles.BoardWrapper}>
      {activeBoard.columns.length > 0 ? (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type={KanbanTypes.Column}>
              {(provided) => (
                <div
                  className={styles.ColumnsContainer}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {activeBoard.columns.map((column, index) => (
                    <Column key={column.id} column={column} index={index} />
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button
            className={styles.NewColumn}
            onClick={() => {
              open("update");
            }}
          >
            +New Column
          </button>
        </>
      ) : (
        <div className={styles.EmptyBoard}>
          <h1>This board is empty. Create a new column to get started.</h1>
          <Button
            variant={ButtonVariant.Primary}
            btnType="Welcome"
            onClick={() => {
              open("create");
            }}
          >
            +Add New Column
          </Button>
        </div>
      )}
    </div>
  ) : (
    <div className={styles.EmptyBoard}>
      <h1>
        {boards.length ? (
          <span>
            {!displayedSideMenu ? <DisplayBoards showIcon={true} /> : "Select existing board"} or
            create a new one.
          </span>
        ) : (
          "There are no boards. Create a new board to get started."
        )}
      </h1>
      <Button
        variant={ButtonVariant.Primary}
        btnType="Welcome"
        onClick={() => {
          open("create");
        }}
      >
        +Add New Board
      </Button>
    </div>
  );
};

export default Board;
