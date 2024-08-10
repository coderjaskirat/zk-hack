"use client";

import { nova } from "@/constants/network";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

type Web3ProviderProps = {
  children: React.ReactNode;
};

export const Web3Provider: FC<Web3ProviderProps> = ({ children }) => {
  const config = getDefaultConfig({
    appName: "Pictionary Proof",
    projectId: "ad9c84e0b9c148eb112fb5a0e09339eb",
    chains: [nova],
    ssr: true,
  });

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
