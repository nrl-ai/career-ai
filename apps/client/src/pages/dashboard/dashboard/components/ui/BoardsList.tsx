import { useDialog } from "@/client/stores/dialog";
import classNames from "classnames";
import { FC } from "react";
import { useBoardStore } from "../../store/BoardStore";
import styles from "../../styles/components/ui/BoardsList.module.scss";
import { BoardIcon, HideMenuIcon } from "../icons";

interface BoardsListProps {
  hideSideMenu?: () => void;
}

const BoardsList: FC<BoardsListProps> = ({ hideSideMenu }) => {
  const { setActiveBoard } = useBoardStore();
  const boards = useBoardStore((state) => state.boards);
  const { open } = useDialog("job-board");

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

          <button
            className={styles.CreateNewBoard}
            onClick={() => {
              open("update");
            }}
          >
            <BoardIcon />
            <h2>+Create New Board</h2>
          </button>
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
