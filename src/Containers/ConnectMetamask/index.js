import React, { useEffect } from "react";
import { useEthers } from "@usedapp/core";
import Button from "../../Common/Components/Button";

import styles from "./styles.module.scss";
import { usePersistanceState } from "../../libs/usePersistanceState";

type Props = {
  onChange: (status: boolean) => void
};

export const ConnectMetamask = ({ onChange }: Props) => {
  const { activateBrowserWallet, active } = useEthers();
  const [hasBeenConnected, setHasBeenConnected] = usePersistanceState(false, "metamask-connected");

  const handleActivate = async () => {
    activateBrowserWallet();
  };

  useEffect(() => {
    onChange(active);

    if (active) {
      setHasBeenConnected(true);
    }
  }, [active]);

  useEffect(() => {
    if (hasBeenConnected) {
      activateBrowserWallet();
    }
  }, [hasBeenConnected]);

  return (
    <div className={styles.box}>
      <Button
        text="Connect Metamask"
        modWidth="width-auto"
        modHeight="height-big"
        modStyle="filled"
        modColor="color-main"
        callback={handleActivate}
      />
    </div>
  );
};
