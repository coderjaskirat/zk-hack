"use client";

import { useGameStore } from "@/states/game";
import { useCallback, useState } from "react";
import { Loading } from "../icons/loading";
import { CreateGameModal } from "../modals/CreateGameModal";
import { JoinGameModal } from "../modals/JoinGameModal";

export const HomeCard = () => {
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState("");
  const [joinTime, setJoinTime] = useState(2);
  const { gameID, setGameID } = useGameStore((state) => state);

  const handleCreateGame = useCallback(() => {
    setIsCreatingGame(true);
    setShowJoinModal(true);
  }, []);

  const handleJoinGame = useCallback(() => {
    setIsJoiningGame(true);
    setShowJoinModal(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsCreatingGame(false);
    setIsJoiningGame(false);
    setShowCreateModal(false);
    setShowJoinModal(false);
  }, []);

  const handleCreateSubmit = useCallback(() => {
    console.log("Game Created with settings:", { maxPlayers, joinTime });
    setIsCreatingGame(false);
    setShowCreateModal(false);
  }, [maxPlayers, joinTime]);

  const handleJoinSubmit = useCallback(() => {
    console.log("Joining Game ID:", gameID);
    setIsJoiningGame(false);
    setShowJoinModal(false);
  }, [gameID]);

  return (
    <div className="w-full max-w-4xl p-8 text-center shadow-lg rounded-xl bg-white">
      <h1 className="text-4xl font-bold text-brand-darker">Pictionary Proof</h1>
      <p className="my-4 text-lg text-gray-600">
        Pick, draw, guess, and have fun in groups of any size!
      </p>

      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        <button
          onClick={handleCreateGame}
          disabled={isCreatingGame || isJoiningGame}
          className={`w-48 rounded-lg ${
            isCreatingGame || isJoiningGame
              ? "bg-gray-400"
              : "bg-brand-400 hover:bg-brand-darker"
          } py-3 px-6 text-xl font-semibold text-white`}
        >
          {isCreatingGame ? <Loading /> : "Create Game"}
        </button>
        <button
          onClick={handleJoinGame}
          disabled={isCreatingGame || isJoiningGame}
          className={`w-48 rounded-lg ${
            isCreatingGame || isJoiningGame
              ? "bg-gray-300"
              : "bg-brand-300 hover:bg-brand-500"
          } py-3 px-6 text-xl font-semibold text-white`}
        >
          {isJoiningGame ? <Loading /> : "Join Game"}
        </button>
        {isCreatingGame || isJoiningGame ? (
          <button
            onClick={handleCancel}
            className="w-48 rounded-lg bg-red-500 hover:bg-red-700 py-3 px-6 text-xl font-semibold text-white"
          >
            Cancel
          </button>
        ) : null}
      </div>

      <CreateGameModal
        isOpen={showCreateModal}
        maxPlayers={maxPlayers}
        joinTime={joinTime}
        setMaxPlayers={setMaxPlayers}
        setJoinTime={setJoinTime}
        onCancel={handleCancel}
        onSubmit={handleCreateSubmit}
      />
      <JoinGameModal
        isOpen={showJoinModal}
        gameId={gameID}
        setGameId={setGameID}
        onCancel={handleCancel}
        onJoin={handleJoinSubmit}
      />
    </div>
  );
};
