"use client";

import React from "react";

interface Props {
  isOpen: boolean;
  gameId: string;
  setGameId: (value: string) => void;
  onCancel: () => void;
  onJoin: () => void;
}

export const JoinGameModal: React.FC<Props> = ({
  isOpen,
  gameId,
  setGameId,
  onCancel,
  onJoin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-brand-darker">Join Game</h2>
        <label className="block my-4 text-brand">
          Game ID:
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter game ID"
          />
        </label>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-brand-500 hover:bg-brand-700 text-white py-2 px-4 rounded"
            onClick={onJoin}
          >
            Join Game
          </button>
        </div>
      </div>
    </div>
  );
};
