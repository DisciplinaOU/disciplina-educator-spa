import React from "react";
import styles from "./styles.module.scss";
import alert from "../../Common/Assets/alert.svg";

export const ComingSoon = () => (
  <div className={styles.box}>
    <img className={styles.alert} src={alert} alt="alert" />
    <h2 className={styles.title}>Coming Soon</h2>
  </div>
);
