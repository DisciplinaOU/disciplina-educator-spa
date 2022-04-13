import { useEffect, useState } from "react";
import { Web3 } from "./core";

export const useConnect = () => {
  const [connected, setConnected] = useState(Web3.state.connected);
  const [accounts, setAccounts] = useState(Web3.state.accounts);
  const [pending, setPending] = useState(false);

  const connect = async () => {
    setPending(true);

    Web3.requestAccounts()
      .then(payload => {
        setAccounts(payload);
        setConnected(true);
      })
      .finally(() => {
        setPending(false);
      });
  };

  useEffect(() => {
    const unsubscribe = Web3.onConnect(() => {
      setAccounts(Web3.state.accounts);
      setConnected(Web3.state.connected);
      setPending(false);
    }, []);

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    connect,
    accounts,
    connected,
    pending
  };
};
