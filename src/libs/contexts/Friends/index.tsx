import { ReactNode, createContext, useContext } from "react";
import { FRIENDS_CONTEXT_DEFAULT_VALUES } from "../defaultValues";
import { useFriends } from "../../hooks";

const FriendsContext = createContext(FRIENDS_CONTEXT_DEFAULT_VALUES);

export const useFriendsContext = () => {
  const context = useContext(FriendsContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};

export const FriendsProvider = ({ children }: { children: ReactNode }) => {
  const friendsMethods = useFriends();

  return (
    <FriendsContext.Provider value={friendsMethods}>
      {children}
    </FriendsContext.Provider>
  );
};
