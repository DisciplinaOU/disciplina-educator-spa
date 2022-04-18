import React from "react";
import classnames from "classnames/bind";
import { PropsWithChildren } from "react";

import styles from "./styles.module.scss";

const cx = classnames.bind(styles);

type Props = PropsWithChildren<{
  className?: string
}>;

const Overlay = ({ className, children }: Props) => {
  return <div className={cx("overlay", className)}>{children}</div>;
};

export { Overlay };
