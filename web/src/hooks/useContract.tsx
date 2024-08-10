import { ABI, CONTRACT_ADDRESS } from "@/constants/contract";
import { useGameStore } from "@/states/game";
import { useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export const useContractWrite = () => {
  const { writeContractAsync } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const { txMode } = useGameStore((state) => state);

  const { data } = useWaitForTransactionReceipt({ hash });
  console.log("data", data);

  const createGame = async (maxPlayers: string, joinTime: number) => {
    console.log("writeContract", writeContractAsync);
    const tx =
      txMode === "user"
        ? await writeContractAsync({
            abi: ABI,
            address: CONTRACT_ADDRESS,
            functionName: "createGame",
            args: [maxPlayers, joinTime],
          })
        : await fetch("/api/create-game", {
            method: "POST",
            body: JSON.stringify({ maxPlayers, joinTime }),
          })
            .then((res) => res.json())
            .then((res) => res.hash);
    console.log("tx", tx);
    setHash(tx);

    return tx;
  };

  const joinGame = async (gameId: string, randomNumber: string) => {
    const tx =
      txMode === "user"
        ? await writeContractAsync({
            abi: ABI,
            address: CONTRACT_ADDRESS,
            functionName: "joinGame",
            args: [gameId, randomNumber],
          })
        : await fetch("/api/join-game", {
            method: "POST",
            body: JSON.stringify({ gameId, randomNumber }),
          })
            .then((res) => res.json())
            .then((res) => res.hash);
    console.log("tx", tx);
    return tx;
  };

  return { createGame, joinGame };
};
