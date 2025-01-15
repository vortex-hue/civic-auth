// src/components/WalletInfo.tsx
import React, { useState, useEffect } from "react";
import { useUser } from "@civic/auth-web3/react";
import { BrowserProvider, formatEther } from "ethers";
import { WalletInfo as IWalletInfo } from "../types";

const WalletInfo: React.FC = () => {
  const { user } = useUser();
  const [walletInfo, setWalletInfo] = useState<IWalletInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWalletInfo = async (): Promise<void> => {
      if (user && window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const balanceWei = await provider.getBalance(address);
          const balanceEth = formatEther(balanceWei);

          setWalletInfo({
            address,
            balance: balanceEth,
          });
          setError(null);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Error fetching wallet info"
          );
          console.error("Error fetching wallet info:", err);
        }
      }
    };

    getWalletInfo();
  }, [user]);

  if (!user) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Web3 Wallet</h2>

      {error && (
        <div className="p-4 mb-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {walletInfo ? (
        <>
          <div className="mb-4">
            <p className="text-gray-600">Address:</p>
            <p className="font-mono break-all">{walletInfo.address}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">Balance:</p>
            <p className="text-xl font-bold">{walletInfo.balance} ETH</p>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Loading wallet information...</p>
      )}
    </div>
  );
};

export default WalletInfo;
