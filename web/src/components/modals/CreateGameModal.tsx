"use client";

import React from "react";

interface Props {
  isOpen: boolean;
  maxPlayers: string;
  joinTime: number;
  setMaxPlayers: (value: string) => void;
  setJoinTime: (value: number) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const CreateGameModal: React.FC<Props> = ({
  isOpen,
  maxPlayers,
  joinTime,
  setMaxPlayers,
  setJoinTime,
  onCancel,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-brand-darker">Game Settings</h2>
        <label className="block my-4 text-brand">
          Max Players (leave empty for no limit):
          <input
            type="number"
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="No limit"
          />
        </label>
        <label className="block my-4 text-brand">
          Join Time (in minutes):
          <input
            type="number"
            value={joinTime}
            onChange={(e) => setJoinTime(parseInt(e.target.value, 10))}
            className="mt-1 p-2 border rounded w-full"
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
            onClick={onSubmit}
          >
            Create Game
          </button>
        </div>
      </div>
    </div>
  );
};
