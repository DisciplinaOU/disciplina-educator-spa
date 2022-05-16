import classNames from "classnames/bind";
import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

type Props = PropsWithChildren<{
  timeout?: number,
  active?: boolean,
  kind?: "error" | "success"
}>;

export const Notification = ({ timeout = 1000, active, kind, children }: Props) => {
  return createPortal(
    <CSSTransition
      in={active}
      timeout={timeout}
      classNames={{
        enterActive: cx("enter-active"),
        enterDone: cx("enter-done")
      }}
    >
      <div className={cx("box", kind)}>{children}</div>
    </CSSTransition>,
    document.body
  );
};
