import { providers } from "ethers";
import { EventEmitter } from "../eventEmitter";

const Web3Service = () => {
  const eventEmitter = EventEmitter();
  const provider = new providers.Web3Provider(window.ethereum);

  const state = {
    accounts: [],
    defaultAccount: null,
    connected: false
  };

  const setConnected = value => {
    state.connected = value;
    if (value) eventEmitter.emit("onConnected");
  };

  const setAccounts = accounts => {
    if (accounts) {
      state.accounts = accounts;
      state.defaultAccount = accounts[0] || null;
    }
  };

  const onConnect = callback => eventEmitter.add("onConnected", callback);

  const requestAccounts = () => {
    return provider.send("eth_requestAccounts").then(payload => {
      setConnected(true);
      setAccounts(payload);
    });
  };

  return {
    state,
    provider,
    onConnect,
    requestAccounts
  };
};

export const Web3 = new Web3Service();

console.log(Web3);
