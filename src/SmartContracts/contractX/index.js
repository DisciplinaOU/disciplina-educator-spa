import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";

import abi from "./abi.json";

const wethInterface = new utils.Interface(abi);

const address = process.env.REACT_APP_CONTRACT_X_ADDRESS;

export const contractX = new Contract(address, wethInterface);
