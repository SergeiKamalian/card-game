import { ReactNode, createContext, useContext } from "react";
import { useGame } from "../../hooks";
import { GAME_CONTEXT_DEFAULT_VALUES } from "../defaultValues";

const GameContext = createContext(GAME_CONTEXT_DEFAULT_VALUES);

export const useGameContext = () => {
  const context = useContext(GameContext);
  console.log(context)
  if (!context) {
    throw new Error("useGameContext must be used within a GameContext");
  }
  return context;
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const gameMethods = useGame();

  return (
    <GameContext.Provider value={gameMethods}>{children}</GameContext.Provider>
  );
};
