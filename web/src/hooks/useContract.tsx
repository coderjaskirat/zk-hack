import { ABI, CONTRACT_ADDRESS } from "@/constants/contract";
import { useWriteContract } from "wagmi";

export const useContractWrite = () => {
  const { writeContract } = useWriteContract();

  const createGame = async (maxPlayers: string, joinTime: number) => {
    const tx = await writeContract({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "createGame",
      args: [maxPlayers, joinTime],
    });
    return tx;
  };

  const joinGame = async (gameId: string) => {
    const tx = await writeContract({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "joinGame",
      args: [gameId],
    });
    return tx;
  };

  return { createGame, joinGame };
};
