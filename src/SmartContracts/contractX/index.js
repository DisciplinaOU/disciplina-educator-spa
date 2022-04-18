import { ethers, utils } from "ethers";
import { Web3 } from "../../libs/web3/core";
import abi from "./abi.json";

const wethInterface = new utils.Interface(abi);

const address = process.env.REACT_APP_CONTRACT_X_ADDRESS;
const { provider } = Web3.state;

export const contractX = new ethers.Contract(address, wethInterface, provider && provider.getSigner());
