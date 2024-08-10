import { create } from "zustand";

interface GameState {
  isGameInCreation: boolean;
  txMode: "user" | "be";
  gameID: string;
  userID: string;
}

interface GameActions {
  setGameID: (gameID: string) => void;
  setUserID: (userID: string) => void;
  setGameCreation: (isGameInCreation: boolean) => void;
}

const initialGameState: GameState = {
  isGameInCreation: false,
  txMode: "be",
  gameID: "",
  userID: "",
};

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initialGameState,
  setGameID: (gameID: string) => set({ gameID }),
  setUserID: (userID: string) => set({ userID }),
  setGameCreation: (isGameInCreation: boolean) => set({ isGameInCreation }),
}));
