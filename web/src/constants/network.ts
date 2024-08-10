import { Chain } from "wagmi/chains";

export const nova: Chain = {
  id: 490000,
  name: "Gemini 3h Nova - Autonomys Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "tSSC",
    symbol: "tSSC",
  },
  rpcUrls: {
    default: {
      http: ["https://nova-0.gemini-3h.subspace.network/ws"],
    },
    public: {
      http: ["https://nova-0.gemini-3h.subspace.network/ws"],
    },
  },
  blockExplorers: {
    default: {
      name: "Nova Explorer",
      url: "https://nova.subspace.network",
    },
  },
};

export const networks: Chain[] = [nova];
