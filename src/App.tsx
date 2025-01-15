// src/App.tsx
import React from "react";
import { CivicAuthProvider } from "@civic/auth-web3/react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import Layout from "./components/Layout";
import UserProfile from "./components/UserProfile";
import WalletInfo from "./components/WalletInfo";
import { AuthError } from "./types";

// Configure wagmi
const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const App: React.FC = () => {
  const handleSignIn = (error: AuthError | undefined): void => {
    if (error) {
      console.error("Sign in error:", error);
    } else {
      console.log("Successfully signed in and wallet created!");
    }
  };

  return (
    <WagmiProvider config={config}>
      <CivicAuthProvider
        clientId={process.env.REACT_APP_CIVIC_CLIENT_ID || ""}
        onSignIn={handleSignIn}
      >
        <Layout>
          <div className="space-y-6">
            <UserProfile />
            <WalletInfo />
          </div>
        </Layout>
      </CivicAuthProvider>
    </WagmiProvider>
  );
};

export default App;
