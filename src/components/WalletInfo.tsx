// src/components/WalletInfo.tsx
import React, { useState, useEffect } from "react";
import { useUser } from "@civic/auth-web3/react";
import { formatEther } from "ethers";
import { WalletInfo as IWalletInfo } from "../types";
import { userHasWallet } from "@civic/auth-web3";

const WalletInfo: React.FC = () => {
  const userContext = useUser();
  const [walletInfo, setWalletInfo] = useState<IWalletInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWalletInfo = async (): Promise<void> => {
      if (userContext.user && userHasWallet(userContext)) {
        try {
          const address = userContext.walletAddress;
          const balanceWei = await userContext.wallet.getBalance({ address });
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
  }, [userContext]);

  const createWallet = async () => {
    if (userContext.user && !userHasWallet(userContext)) {
      try {
        await userContext.createWallet();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error creating wallet");
        console.error("Error creating wallet:", err);
        // Display a user-friendly error message
        alert(
          "Failed to create wallet. Please try again later or contact support."
        );
      }
    }
  };

  if (!userContext.user) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Web3 Wallet</h2>

      {error && (
        <div className="p-4 mb-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      {userHasWallet(userContext) ? (
        walletInfo ? (
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
        )
      ) : (
        <>
          <p className="text-gray-600 mb-4">No wallet found.</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={createWallet}
          >
            Create Wallet
          </button>
        </>
      )}
    </div>
  );
};

export default WalletInfo;
