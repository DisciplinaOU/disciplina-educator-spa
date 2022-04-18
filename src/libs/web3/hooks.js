import { useEffect, useState } from "react";
import { Web3 } from "./core";

export const useConnect = () => {
  const [connected, setConnected] = useState(Web3.state.connected);
  const [accounts, setAccounts] = useState(Web3.state.accounts);
  const [hasProvider, setHasProvider] = useState(Web3.state.provider);
  const [pending, setPending] = useState(false);

  const connect = async () => {
    setPending(true);

    Web3.connect().finally(() => {
      setPending(false);
    });
  };

  useEffect(() => {
    Web3.onInit(provider => {
      setHasProvider(Boolean(provider));
    });
  }, []);
  useEffect(() => {
    const unsubscribe = Web3.onConnectionChange(status => {
      if (connected === status) return;

      setAccounts(Web3.state.accounts);
      setConnected(Web3.state.connected);
      setPending(false);
    }, []);

    return () => {
      unsubscribe();
    };
  }, [connected]);

  return {
    connect,
    accounts,
    connected,
    pending,
    hasProvider
  };
};
