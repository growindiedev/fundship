import "../styles/globals.css";
import { useState, useEffect } from "react";
import { utils } from "ethers";
import { crowdfundingAddress } from "../config";
import { AccountContext } from "../context.js";
import { ethers } from "ethers";

import ConnectWallet from "../components/ConnectWallet.js";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import Layout from "../components/layout";

import Crowdfunding from "../artifacts/contracts/Crowdfunding.sol/Crowdfunding.json";

function MyApp({ Component, pageProps }) {
  const [myContract, setMyContract] = useState(null);
  const [address, setAddress] = useState();

  let provider, signer, add;

  async function changeNetwork() {
    // switch network to matic mumbai
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
                  name: "Matic Testnet",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc-mumbai.matic.today"],
                blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
              },
            ],
          });
        } catch (addError) {
          alert("Error in matic mumbai testnet");
        }
      }
    }
  }

  async function connect() {
    let res = await connectToMetamask();
    if (res === true) {
      await changeNetwork();
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      add = await signer.getAddress();
      setAddress(add);

      try {
        const contract = new ethers.Contract(
          crowdfundingAddress,
          Crowdfunding.abi,
          signer
        );
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

  useEffect(() => {
    connect();
  }, [address]);

  function WithAuth() {
    return !myContract ? (
      <ConnectWallet connectMetamask={connect} />
    ) : (
      <>
        <NavbarComponent address={address} />
        <Component {...pageProps} />
        <FooterComponent />
      </>
    );
  }

  return (
    <div className="app">
      <AccountContext.Provider
        value={{
          connectToMetamask: connect,
          userAddress: address,
          contract: myContract,
        }}
      >
        <WithAuth />
      </AccountContext.Provider>
    </div>
  );
}

export default MyApp;
