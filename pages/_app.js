import "../styles/globals.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { utils } from "ethers";
import { crowdfundingAddress } from "../config";
import { AccountContext } from "../context.js";
import { ethers } from "ethers";

import ConnectWallet from "../components/ConnectWallet.js";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

import { abi } from "../abi";

function MyApp({ Component, pageProps }) {
  const CONTRACT_ADDRESS = "0xad7C61FC480E5EEBA7886Fc62A789F9921caC9d7";

  const [myContract, setMyContract] = useState(null);
  const [address, setAddress] = useState();

  let provider, signer, add;

  async function changeNetwork() {
    // switch network to avalanche
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xa869" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xa869",
                chainName: "Avalanche Fuji Testnet",
                nativeCurrency: {
                  name: "Avalanche",
                  symbol: "AVAX",
                  decimals: 18,
                },
                rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
              },
            ],
          });
        } catch (addError) {
          alert("Error in add avalanche FUJI testnet");
        }
      }
    }
  }

  //chainId = web3.utils.toHex(chainId);

  // async function changeNetwork() {
  //   // switch network to matic mumbai
  //   try {
  //     await window.ethereum.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: utils.hexValue(80001) }],
  //     });
  //   } catch (switchError) {
  //     // This error code indicates that the chain has not been added to MetaMask.
  //     if (switchError.code === 4902) {
  //       try {
  //         await window.ethereum.request({
  //           method: "wallet_addEthereumChain",
  //           params: [
  //             {
  //               chainId: utils.hexValue(80001),
  //               chainName: "Matic Mumbai Testnet",
  //               nativeCurrency: {
  //                 name: "Matic Mumbai Testnet",
  //                 symbol: "MATIC",
  //                 decimals: 18,
  //               },
  //               rpcUrls: ["https://rpc-mumbai.matic.today"],
  //               blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  //             },
  //           ],
  //         });
  //       } catch (addError) {
  //         alert("Error in matic mumbai testnet");
  //       }
  //     }
  //   }
  // }

  async function connect() {
    let res = await connectToMetamask();
    if (res === true) {
      await changeNetwork();
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      add = await signer.getAddress();
      setAddress(add);

      try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
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

  function WithAuth() {
    return !myContract ? (
      <ConnectWallet connectMetamask={connect} />
    ) : (
      <>
        {myContract && <NavbarComponent address={address} />}
        <Component {...pageProps} />
        {myContract && <FooterComponent />}
      </>
    );
  }

  return (
    <div className="app">
      <WithAuth />
    </div>
  );
}

export default MyApp;
