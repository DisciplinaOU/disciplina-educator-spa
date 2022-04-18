/* eslint-disable import/prefer-default-export */
// @flow
import React, { useEffect, useContext } from "react";
import { useConnect, Web3 } from "../../libs/web3";
import Button from "../../Common/Components/Button";
import AAAService from "../../Services/aaa";
import styles from "./styles.module.scss";
import { usePersistanceState } from "../../libs/usePersistanceState";
import { AuthContext } from "../../Contexts/Auth";

export const ConnectMetamask = () => {
  const [hasBeenConnected, setHasBeenConnected] = usePersistanceState(false, "metamask-connected");
  const { connect, hasProvider, connected, accounts } = useConnect();
  const auth = useContext(AuthContext);

  const handleAuth = async () => {
    try {
      const publicAddress = accounts[0].toLowerCase();
      const [existingUser] = await AAAService.findUser(publicAddress);
      const currentUser = existingUser || (await AAAService.createUser(publicAddress));

      const provider = Web3.getCurrentProvider();
      const signer = provider.getSigner();
      const signature = await signer.signMessage(
        `I am signing my one-time nonce: ${currentUser.nonce}`,
        publicAddress,
        "" // MetaMask will ignore the password argument here
      );

      const { accessToken } = await AAAService.login(publicAddress, signature);

      auth.login(currentUser, accessToken);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (connected && accounts.length) handleAuth();
  }, [connected]);

  useEffect(() => {
    if (hasBeenConnected && !connected) connect();

    setHasBeenConnected(connected);
  }, [hasBeenConnected, connected]);

  if (!hasProvider) {
    return (
      <div className={styles.noMetamaskBox}>
        <h1>Metamask is not detected</h1>
        <p>
          You need to install metamask and then <a href=".">reload</a> the page
        </p>
        <a href="https://metamask.io/download/" rel="noopener noreferrer" target="_blank">
          <Button text="Install" modWidth="width-auto" modHeight="height-big" modStyle="filled" modColor="color-main" />
        </a>
      </div>
    );
  }

  return (
    <div className={styles.connectMetamaskBox}>
      <h1>Metamask is not connected</h1>
      <p>You need to connect to your metamask</p>
      <Button
        text="Connect"
        modWidth="width-auto"
        modHeight="height-big"
        modStyle="filled"
        modColor="color-main"
        callback={connect}
      />
    </div>
  );
};
