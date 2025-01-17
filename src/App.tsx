// src/App.tsx
import React, { useEffect } from "react";
import { CivicAuthProvider, useUser } from "@civic/auth-web3/react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import Layout from "./components/Layout";
import UserProfile from "./components/UserProfile";
import WalletInfo from "./components/WalletInfo";
import { AuthError } from "./types";
import { userHasWallet } from "@civic/auth-web3";

// Configure wagmi
const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

const App: React.FC = () => {
  const userContext = useUser();

  const afterLogin = async () => {
    if (userContext.user && !userHasWallet(userContext)) {
      await userContext.createWallet();
    }
  };

  useEffect(() => {
    afterLogin();
  }, [userContext]);

  const handleSignIn = (error: AuthError | undefined): void => {
    if (error) {
      console.error("Sign in error:", error);
    } else {
      console.log("Successfully signed in!");
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
