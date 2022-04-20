import React, { FC } from "react";

import styles from "./styles.module.scss";

export type ProgressProps = {
  mode: "indeterminate",
  inProgress?: boolean
};

export const Progress: FC<ProgressProps> = ({ mode = "indeterminate", inProgress = true }) => (
  <div className={styles.box} data-in-progress={inProgress}>
    {inProgress && <>{mode === "indeterminate" && <div className={styles.indeterminate} />}</>}
  </div>
);
