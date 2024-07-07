import React, { FC } from "react";
import classNames from "classnames";
import styles from "../../styles/components/ui/Button.module.scss";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: string;
  btnType?: string;
  children: React.ReactNode;
}

export enum ButtonVariant {
  Primary = "Primary",
  Secondary = "Secondary",
  Destructive = "Destructive",
  Disabled = "Disabled",
}

const Button: FC<ButtonProps> = ({
  variant = ButtonVariant.Primary,
  onClick,
  btnType = "Text",
  children,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label={`${variant}${btnType}`}
      className={classNames(styles.Button, styles[variant], styles[btnType])}
    >
      {children}
    </button>
  );
};

export default Button;
