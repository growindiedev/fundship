import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { utils } from "ethers";
import { crowdfundingAddress } from "../config";
import { AccountContext } from "../context.js";

export default function Home() {
  const router = useRouter();
  const [myContract, setMyContract] = useState(null);
  const [address, setAddress] = useState();

  let provider, signer, add;

  //chainId = web3.utils.toHex(chainId);

  async function changeNetwork() {
    // switch network to avalanche
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: utils.hexValue(80001) }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: utils.hexValue(80001),
                chainName: "Matic Mumbai Testnet",
                nativeCurrency: {
                  name: "Matic Mumbai Testnet",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc-mumbai.matic.today"],
                blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
              },
            ],
          });
        } catch (addError) {
          alert("Error in add avalanche FUJI testnet");
        }
      }
    }
  }

  // Connects to Metamask and sets the myContract state with a new instance of the contract
  async function connect() {
    let res = await connectToMetamask();
    if (res === true) {
      await changeNetwork();
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      add = await signer.getAddress();
      setAddress(add);

      try {
        const contract = new ethers.Contract(crowdfundingAddress, abi, signer);
        setMyContract(contract);
      } catch (err) {
        alert("CONTRACT_ADDRESS not set properly");
        console.log(err);
      }
    } else {
      alert("Couldn't connect to Metamask");
    }
  }

  async function connectToMetamask() {
    try {
      await window.ethereum.enable();
      return true;
    } catch (err) {
      return false;
    }
  }
  return <div></div>;
}
