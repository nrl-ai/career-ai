"use client";

import { useBoardStore } from "../../store/BoardStore";
import React, { FC } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import styles from "../../styles/components/board/Board.module.scss";
import Column from "./Column";
import { KanbanTypes } from "../../types";
import Button, { ButtonVariant } from "../ui/Button";
import AddNewBoardModal from "../AddNewBoardModal";
import DisplayBoards from "../DisplayBoards";
import EditBoardModal from "../EditBoardModal";

interface BoardProps {
  displayedSideMenu: boolean;
}

const Board: FC<BoardProps> = ({ displayedSideMenu }) => {
  const { boards, activeBoardId, moveTask, moveColumn } = useBoardStore();

  const activeBoard = boards.find(({ id }) => id === activeBoardId);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    if (type === KanbanTypes.Task) {
      moveTask(
        activeBoardId,
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
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
            <Droppable
              droppableId="board"
              direction="horizontal"
              type={KanbanTypes.Column}
            >
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
          <EditBoardModal activeBoard={activeBoard}>
            <button className={styles.NewColumn}>+New Column</button>
          </EditBoardModal>
        </>
      ) : (
        <div className={styles.EmptyBoard}>
          <h1>This board is empty. Create a new column to get started.</h1>
          <EditBoardModal activeBoard={activeBoard}>
            <Button variant={ButtonVariant.Primary} btnType="Welcome">
              +Add New Column
            </Button>
          </EditBoardModal>
        </div>
      )}
    </div>
  ) : (
    <div className={styles.EmptyBoard}>
      <h1>
        {boards.length ? (
          <span>
            {!displayedSideMenu ? (
              <DisplayBoards showIcon={true} />
            ) : (
              "Select existing board"
            )}{" "}
            or create a new one.
          </span>
        ) : (
          "There are no boards. Create a new board to get started."
        )}
      </h1>
      <AddNewBoardModal>
        <Button variant={ButtonVariant.Primary} btnType="Welcome">
          +Add New Board
        </Button>
      </AddNewBoardModal>
    </div>
  );
};

export default Board;
