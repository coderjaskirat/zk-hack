"use client";

import { useCanvas } from "@/hooks/useCanvas";
import { useContractWrite } from "@/hooks/useContract";
import { useGameStore } from "@/states/game";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { Loading } from "../icons/loading";
import { CreateGameModal } from "../modals/CreateGameModal";
import { JoinGameModal } from "../modals/JoinGameModal";

export const HomeCard = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { isConnected } = useAccount();
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [isJoiningGame, setIsJoiningGame] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [maxPlayers, setMaxPlayers] = useState("");
  const [joinTime, setJoinTime] = useState(2);
  const { gameID, isGameInCreation, setGameID } = useGameStore(
    (state) => state
  );
  const { disconnect } = useDisconnect();
  const { createGame, joinGame } = useContractWrite();
  const [pixelData, setPixelData] = useState<string>("");

  useEffect(() => {
    setGameID(gameId);
  }, [gameId, setGameID]);

  const handleCreateGame = useCallback(() => {
    setIsCreatingGame(true);
    setShowCreateModal(true);
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

  const handleCreateSubmit = useCallback(async () => {
    await createGame(maxPlayers, joinTime);
    console.log("Game Created with settings:", { maxPlayers, joinTime });
    setIsCreatingGame(false);
    setShowCreateModal(false);
  }, [createGame, maxPlayers, joinTime]);

  const handleJoinSubmit = useCallback(async () => {
    await joinGame(gameID, "1234");
    console.log("Joining Game ID:", gameID);
    setIsJoiningGame(false);
    setShowJoinModal(false);
  }, [gameID, joinGame]);

  const handleDisconnect = useCallback(() => {
    console.log("Disconnecting Wallet");
    disconnect();
  }, [disconnect]);

  const [canvasRef, setCanvasElRef] = useCanvas((canvas) => {
    canvas.setDimensions({
      width: 500,
      height: 500,
    });
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = "#000000";
  });

  const handleExport = () => {
    if (!canvasRef.current) return;

    // Convert the current canvas content to a data URL
    const originalDataURL = canvasRef.current.toDataURL({
      format: "png",
      quality: 1.0,
    });

    // Create an off-screen canvas for resizing
    const offScreenCanvas = document.createElement("canvas");
    const ctx = offScreenCanvas.getContext("2d");

    if (!ctx) return;

    // Set the size of the off-screen canvas to 100x100
    offScreenCanvas.width = 100;
    offScreenCanvas.height = 100;

    // Create an image element to load the original data URL
    const img = new Image();
    img.src = originalDataURL;

    img.onload = () => {
      // Draw the original image onto the off-screen canvas, resized to 100x100
      ctx.drawImage(img, 0, 0, 100, 100);

      // Get the resized image data URL from the off-screen canvas
      const resizedDataURL = offScreenCanvas.toDataURL("image/png");

      // Create a temporary download link
      const link = document.createElement("a");
      link.href = resizedDataURL;
      link.download = "canvas-drawing-100x100.png";
      link.click();
    };
  };

  const handleClear = () => {
    if (!canvasRef.current) return;
    canvasRef.current.clear(); // Clear the canvas content
  };

  const handleDisplayPixelData = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current.getElement();
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data } = imageData;
    const binaryPixelArray = [];

    for (let i = 0; i < data.length; i += 4) {
      // Check if the pixel is white
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Assuming the pixel is white if all RGB values are 255
      const isWhite = r === 255 && g === 255 && b === 255;
      binaryPixelArray.push(isWhite ? 0 : 1); // 0 for white, 1 for any other color
    }

    setPixelData(binaryPixelArray.join(", ")); // Assuming you have a state to store this data
  };

  return (
    <div className="w-full max-w-4xl p-8 text-center shadow-lg rounded-xl bg-white">
      <h1 className="text-4xl font-bold text-brand-darker">Pictionary Proof</h1>
      <p className="my-4 text-lg text-gray-600">
        Pick, draw, guess, and have fun in groups of any size!
      </p>

      {isGameInCreation && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <Loading />
          <p className="text-lg text-gray-600">Creating game, please wait...</p>
        </div>
      )}

      {gameID ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          <p className="my-4 text-lg text-gray-600">Time to draw!</p>
          <div className="position-relative">
            <canvas
              ref={setCanvasElRef}
              className="shadow-xl border-2 border-gray-400"
            />
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleExport}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Export as 100x100 PNG
              </button>
              <button
                onClick={handleClear}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Clear
              </button>
              <button
                onClick={handleDisplayPixelData}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Display Pixel Data
              </button>
            </div>
            {pixelData && (
              <textarea
                className="mt-4 w-full h-64 p-2 border border-gray-300 rounded text-black"
                value={pixelData}
                readOnly
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          {!isGameInCreation && (
            <>
              {isConnected ? (
                <>
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
                  <button
                    onClick={handleDisconnect}
                    className="w-48 rounded-lg bg-red-500 hover:bg-red-700 py-3 px-6 text-xl font-semibold text-white"
                  >
                    Disconnect
                  </button>
                  {isCreatingGame || isJoiningGame ? (
                    <button
                      onClick={handleCancel}
                      className="w-48 rounded-lg bg-red-500 hover:bg-red-700 py-3 px-6 text-xl font-semibold text-white"
                    >
                      Cancel
                    </button>
                  ) : null}
                </>
              ) : (
                <ConnectButton />
              )}
            </>
          )}
        </div>
      )}

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
