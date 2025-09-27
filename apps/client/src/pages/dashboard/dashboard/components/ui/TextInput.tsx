"use client";

import React, { FC } from "react";
import styles from "../../styles/components/ui/TextInput.module.scss";
import { CrossIcon } from "../icons";

interface TextInputProps {
  placeholder: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: any) => void;
}

interface TextInputDragProps extends TextInputProps {
  remove: () => void;
}

export const TextInput: FC<TextInputProps> = ({ placeholder, value, defaultValue, onChange }) => {
  return (
    <input
      className={styles.TextInput}
      type="text"
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export const TextArea: FC<TextInputProps> = ({ placeholder, value, defaultValue, onChange }) => {
  return (
    <textarea
      className={styles.TextArea}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export const TextInputDrag: FC<TextInputDragProps> = ({
  placeholder,
  value,
  defaultValue,
  remove,
  onChange,
}) => {
  return (
    <div className={styles.InputDragContainer}>
      <input
        className={styles.TextInput}
        type="text"
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <CrossIcon onClick={remove} />
    </div>
  );
};

export default TextInput;
