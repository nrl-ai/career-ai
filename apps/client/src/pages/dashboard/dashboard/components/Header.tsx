"use client";

import DisplayBoards from "./DisplayBoards";
import styles from "../styles/components/Header.module.scss";
import Button, { ButtonVariant } from "./ui/Button";
import { PlusIcon, VerticalEllipsisIcon } from "./icons";

import { useBoardStore } from "../store/BoardStore";
import AddNewTaskModal from "./AddNewTaskModal";
import classNames from "classnames";
import Options from "./Options";
import { KanbanTypes } from "../types";
import { updateJobApplications } from "@/client/services/job-applications";
import { sampleData } from "../store/boards";

const Header = ({ displayedSideMenu }: { displayedSideMenu: boolean }) => {
  const { boards, activeBoardId } = useBoardStore();
  const activeBoard = boards.find(({ id }) => id === activeBoardId);

  const fillBoardWithExamples = async () => {
    await updateJobApplications(sampleData);
    window.location.reload();
  };

  return (
    <header className={styles.Header}>
      <nav className={styles.Wrapper}>
        {activeBoard && activeBoard.columns.length ? (
          <div className={styles.End}>
            <AddNewTaskModal activeBoard={activeBoard}>
              <Button btnType="Add">
                <PlusIcon />
                <span className={styles.SpanText}>Add New Job</span>
              </Button>
            </AddNewTaskModal>
            <button className="text-blue-500 font-bold" onClick={fillBoardWithExamples}>
              <span className={styles.SpanText}>Fill board with examples</span>
            </button>
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
