import { ABI, CONTRACT_ADDRESS } from "@/constants/contract";
import { useGameStore } from "@/states/game";
import { useEffect, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export const useContractWrite = () => {
  const { writeContractAsync } = useWriteContract();
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const { txMode, setGameID, setGameCreation } = useGameStore((state) => state);

  const { data } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (data) {
      const gameId = data.logs[0].data.toString();
      setGameID(gameId);
      setGameCreation(false);
    }
  }, [data, setGameCreation, setGameID]);

  const createGame = async (maxPlayers: string, joinTime: number) => {
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
    setGameCreation(true);

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
