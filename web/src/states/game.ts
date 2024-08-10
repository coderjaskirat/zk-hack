import { create } from "zustand";

interface GameState {
  gameID: string;
  userID: string;
}

interface GameActions {
  setGameID: (gameID: string) => void;
  setUserID: (userID: string) => void;
}

const initialGameState: GameState = {
  gameID: "",
  userID: "",
};

export const useGameStore = create<GameState & GameActions>((set) => ({
  ...initialGameState,
  setGameID: (gameID: string) => set({ gameID }),
  setUserID: (userID: string) => set({ userID }),
}));
