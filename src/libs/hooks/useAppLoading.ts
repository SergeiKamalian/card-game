import { useState } from "react";

export const useAppLoading = () => {
  const [appLoading, setAppLoading] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(true);

  return {
    appLoading,
    setAppLoading,
    isInitLoading,
    setIsInitLoading
  };
};
