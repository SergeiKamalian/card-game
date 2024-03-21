import { useState, useEffect } from "react";
import { checkUserConnectionStatus } from "../utils";

export const useUserConnection = (id: number) => {
  const [userIsConnected, setUserIsConnected] = useState(false);

  useEffect(() => {
    const fetchUserConnectionStatus = async () => {
      try {
        const isConnected = await checkUserConnectionStatus(id);
        setUserIsConnected(isConnected);
      } catch (error) {
        console.error("Error checking user connection status:", error);
      }
    };

    fetchUserConnectionStatus();
  }, [id]);
  return userIsConnected;
};
