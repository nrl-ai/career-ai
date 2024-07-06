import React, { FC } from "react";
import { BoardIcon, HideMenuIcon } from "../icons";
import AddNewBoardModal from "../AddNewBoardModal";
import { useBoardStore } from "../../store/BoardStore";
import styles from "../../styles/components/ui/BoardsList.module.scss";
import classNames from "classnames";

interface BoardsListProps {
  hideSideMenu?: () => void;
}

const BoardsList: FC<BoardsListProps> = ({ hideSideMenu }) => {
  const { setActiveBoard } = useBoardStore();
  const boards = useBoardStore((state) => state.boards);

  const activeBoardId = useBoardStore((state) => state.activeBoardId);

  return (
    <div className={styles.BoardsListWrapper}>
      <section className={styles.UpperSection}>
        <div className={styles.DialogTitle}>All Boards ({boards.length})</div>
        <div className={styles.BoardsList}>
          {boards.map((board) => (
            <div
              key={board.id}
              className={classNames(
                styles.BoardItem,
                board.id === activeBoardId ? styles.ActiveBoard : "",
              )}
              onClick={() => setActiveBoard(board.id)}
            >
              <BoardIcon className={styles.BoardIcon} />
              <h2 className={styles.BoardTitle}>{board.title}</h2>
            </div>
          ))}

          <AddNewBoardModal>
            <button className={styles.CreateNewBoard}>
              <BoardIcon />
              <h2>+Create New Board</h2>
            </button>
          </AddNewBoardModal>
        </div>
      </section>
      <section className={styles.BottomSection}>
        <div className={styles.HideSideMenu} onClick={hideSideMenu}>
          <HideMenuIcon /> <span>Hide Sidebar</span>
        </div>
      </section>
    </div>
  );
};

export default BoardsList;
