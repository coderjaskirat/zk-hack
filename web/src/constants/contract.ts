export const CONTRACT_ADDRESS = "0x55B9197aD2606B2A02d6f8d661Ebcf84ac91C347";

export const ABI = [
  {
    type: "function",
    name: "createGame",
    inputs: [
      { name: "startTime", type: "uint16", internalType: "uint16" },
      { name: "playerCount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "games",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "startTime", type: "uint16", internalType: "uint16" },
      { name: "creator", type: "address", internalType: "address" },
      { name: "playerCount", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGameCurrentPlayerCount",
    inputs: [{ name: "gameId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGameMaxPlayerCount",
    inputs: [{ name: "gameId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGameStartTime",
    inputs: [{ name: "gameId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "uint16", internalType: "uint16" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "joinGame",
    inputs: [{ name: "gameId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "lastGameId",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "players",
    inputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "GameCreated",
    inputs: [
      {
        name: "gameId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
];
