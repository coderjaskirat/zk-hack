import { ABI, CONTRACT_ADDRESS } from "@/constants/contract";
import { useWriteContract } from "wagmi";

export const useContractWrite = () => {
  const { writeContractAsync } = useWriteContract();

  const createGame = async (maxPlayers: string, joinTime: number) => {
    console.log("writeContract", writeContractAsync);
    const tx = await writeContractAsync({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "createGame",
      args: [maxPlayers, joinTime],
    });
    console.log("tx", tx);
    return tx;
  };

  const joinGame = async (gameId: string) => {
    const tx = await writeContractAsync({
      abi: ABI,
      address: CONTRACT_ADDRESS,
      functionName: "joinGame",
      args: [gameId],
    });
    console.log("tx", tx);
    return tx;
  };

  return { createGame, joinGame };
};
