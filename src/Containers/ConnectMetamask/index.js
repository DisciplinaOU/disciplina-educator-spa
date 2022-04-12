/* eslint-disable import/prefer-default-export */
// @flow
import React, { useEffect } from "react";
import Web3 from "web3";
import { useEthers } from "@usedapp/core";

import Button from "../../Common/Components/Button";
import Educator from "../../Services/types";
import AAAService from "../../Services/aaa";
import styles from "./styles.module.scss";
import { usePersistanceState } from "../../libs/usePersistanceState";

type Props = {
  onLogin: (user: Educator, token: string) => void
};

export const ConnectMetamask = ({ onLogin }: Props) => {
  const { activateBrowserWallet, account, library } = useEthers();
  const [hasBeenConnected, setHasBeenConnected] = usePersistanceState(false, "metamask-connected");

  const handleConnect = async () => {
    await activateBrowserWallet();
  };

  const handleSignMessage = async (
    web3,
    {
      publicAddress,
      nonce
    }: {
      publicAddress: string,
      nonce: string
    }
  ) => {
    try {
      return await web3.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicAddress,
        "" // MetaMask will ignore the password argument here
      );
    } catch (err) {
      throw new Error("You need to sign the message to be able to log in.");
    }
  };

  useEffect(async () => {
    if (account && library) {
      console.log(library);
      console.log(account);

      const web3 = new Web3(library.provider);
      const publicAddress = account.toLowerCase();

      const existingUsers = await AAAService.findUser(publicAddress);

      console.log(existingUsers);

      let curUser: Educator;
      if (existingUsers.length) {
        curUser = existingUsers[0];
      } else {
        curUser = await AAAService.createUser(publicAddress);
      }

      const signature = await handleSignMessage(web3, curUser);
      const { accessToken } = await AAAService.login(publicAddress, signature);

      setHasBeenConnected(true);
      onLogin(curUser, accessToken);
    } else {
      console.log('Something went wrong');
      console.log(account);
      console.log(library);
    }
  }, [library]);

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
        callback={handleConnect}
      />
    </div>
  );
};
