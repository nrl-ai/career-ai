import React, { FC, useState } from "react";
import styles from "../../styles/components/ui/Oval.module.scss";
interface OvalProps {
  color?: string;
}

const Oval: FC<OvalProps> = ({ color }) => {
  const ovalColor = color ? color : "#49c4e5";

  return <div style={{ backgroundColor: ovalColor }} className={styles.Oval} />;
};

export default Oval;
