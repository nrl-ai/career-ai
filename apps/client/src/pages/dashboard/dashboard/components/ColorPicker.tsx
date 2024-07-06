"use client";

import React, { FC, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { useBoardStore } from "../store/BoardStore";

import { BoardTypes, ColumnTypes, TaskTypes } from "../types";
import styles from "../styles/components/ColorPicker.module.scss";

import Oval from "./ui/Oval";
import { CrossIcon, PlusIcon } from "./icons";

import TextInput from "./ui/TextInput";

interface ColorPickerProps {
  columnId: string;
}

const ColorPicker: FC<ColorPickerProps> = ({ columnId }) => {
  const { setOvalColor, activeBoardId, boards } = useBoardStore();
  const activeBoard = boards.find((board: any) => board.id === activeBoardId);
  const column = activeBoard?.columns.find((col: any) => col.id === columnId);
  const currentColor = column?.ovalColor || "#49c4e5";

  const setNewColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setOvalColor(columnId, color);
  };
  return (
    <Popover.Root>
      <Popover.Trigger aria-label="ColorPicker">
        <Oval color={currentColor} />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className={styles.PickerContent} sideOffset={110} side="right">
          <div className={styles.ModalItem}>
            <label htmlFor="Set Color">Set Color</label>
          </div>

          <div className={styles.ModalItem}>
            <TextInput placeholder="#49c4e5" onChange={setNewColor} defaultValue={currentColor} />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default ColorPicker;
