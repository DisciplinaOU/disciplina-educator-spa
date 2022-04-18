import React from "react";
import { Overlay } from "../Overlay";
import { Spinner } from "../Spinner";

import styles from "./styles.module.scss";

type Props = {
  loading?: boolean
};

export const PageLoader = ({ loading }: Props) =>
  loading ? <Overlay className={styles.box}>{<Spinner className={styles.loader} size={60} />}</Overlay> : null;
