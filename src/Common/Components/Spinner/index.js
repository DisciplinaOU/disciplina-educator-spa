import React from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

type Props = {
  size?: string | number,
  strokeWidth?: number,
  className?: string
};

const Spinner = ({ size, className, strokeWidth = 1, ...dataAttrs }: Props) => (
  <div className={cx("spinner", className)} style={{ width: size, height: size }} {...dataAttrs}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="7" strokeWidth={strokeWidth} />
    </svg>
  </div>
);

export { Spinner };
