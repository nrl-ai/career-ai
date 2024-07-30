"use client";

import styles from "../styles/components/Header.module.scss";
import DisplayBoards from "./DisplayBoards";
import { PlusIcon, VerticalEllipsisIcon } from "./icons";
import Button, { ButtonVariant } from "./ui/Button";

import { useDialog } from "@/client/stores/dialog";
import classNames from "classnames";
import { useBoardStore } from "../store/BoardStore";
import { KanbanTypes } from "../types";
import Options from "./Options";

const Header = ({ displayedSideMenu }: { displayedSideMenu: boolean }) => {
  const { open } = useDialog("add-task");
  const { boards, activeBoardId } = useBoardStore();
  const activeBoard = boards.find(({ id }) => id === activeBoardId);

  return (
    <header className={styles.Header}>
      <nav className={styles.Wrapper}>
        {activeBoard && activeBoard.columns.length ? (
          <div className={styles.End}>
            <Button
              btnType="Add"
              onClick={() => {
                open("create");
              }}
            >
              <PlusIcon />
              <span className={styles.SpanText}>Add New Job</span>
            </Button>
            <Options activeBoard={activeBoard} optionsType={KanbanTypes.Board} />
          </div>
        ) : (
          <div className={classNames(styles.End, styles.Disabled)}>
            <Button variant={ButtonVariant.Disabled} btnType="Add">
              <PlusIcon />
              <span className={styles.SpanText}>Add New Job</span>
            </Button>
            <VerticalEllipsisIcon />
          </div>
        )}
        <div className={styles.Start + " ml-8"}>
          <DisplayBoards showIcon />
        </div>
      </nav>
    </header>
  );
};

export default Header;
