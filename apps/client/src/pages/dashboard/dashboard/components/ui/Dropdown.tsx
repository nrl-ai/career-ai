"use client";

import React, { FC } from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";

import styles from "../../styles/components/ui/Dropdown.module.scss";
import { ChevronUpIcon, ChevronDownIcon } from "../icons";
import { ColumnTypes } from "../../types";

interface DropdownProps {
  items: ColumnTypes[];
  onChange: (value: string) => void;
  defaultValue: string;
}

interface DropdownItemProps extends Select.SelectItemProps {
  children: React.ReactNode;
  className?: string;
}

const Dropdown: FC<DropdownProps> = ({ items, onChange, defaultValue }) => {
  return (
    <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
      <Select.Trigger className={styles.SelectTrigger} aria-label="TaskStatus">
        <Select.Value />
        <Select.Icon className="SelectIcon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className={styles.SelectContent}
          position="popper"
          align="start"
          sideOffset={10}
        >
          <Select.ScrollUpButton className={styles.SelectScrollButton}>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className={styles.SelectViewport}>
            {items.map((item, index) => (
              <SelectItem key={index} value={item.title}>
                {item.title}
              </SelectItem>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className={styles.SelectScrollButton}>
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export const SelectItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames(styles.SelectItem, className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";

export default Dropdown;
