import { providers } from "ethers";
import { EventEmitter } from "../eventEmitter";

const detectMetamask = () => Boolean(window.ethereum && window.ethereum.isMetaMask);

const Web3Service = () => {
  const eventEmitter = EventEmitter();

  const state = {
    accounts: [],
    defaultAccount: null,
    connected: false,
    hasMetamask: detectMetamask(),
    provider: detectMetamask() ? new providers.Web3Provider(window.ethereum) : null
  };

  const setAccounts = accounts => {
    if (accounts) {
      state.accounts = accounts;
      state.defaultAccount = accounts[0] || null;
    }
  };

  const setConnected = value => {
    if (state.connected === value) return;

    state.connected = value;
    eventEmitter.emit("onConnectionChange", value);
  };

  const init = () => {
    if (!detectMetamask()) return;

    state.provider = new providers.Web3Provider(window.ethereum);
    eventEmitter.emit("onInit", state.provider);
  };

  const onInit = cb => eventEmitter.add("onInit", cb);
  const onConnectionChange = callback => eventEmitter.add("onConnectionChange", callback);

  const getCurrentProvider = () => state.provider;

  const connect = async () => {
    if (!state.hasMetamask) return null;

    localStorage.setItem("metamask-connected", true);

    return state.provider.send("eth_requestAccounts").then(payload => {
      setAccounts(payload);
      setConnected(true);

      return payload;
    });
  };

  const disconnect = () => {
    if (!state.connected) return;

    localStorage.removeItem("metamask-connected");
    setAccounts([]);
    setConnected(false);
  };

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", accounts => {
      if (state.connected && accounts.length === 0) disconnect();
    });
  }

  return {
    state,
    init,
    onInit,
    onConnectionChange,
    connect,
    disconnect,
    getCurrentProvider
  };
};

export const Web3 = new Web3Service();
