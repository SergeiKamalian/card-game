import { useState } from "react";

export const useAppLoading = () => {
  const [appLoading, setAppLoading] = useState(false);

  return {
    appLoading,
    setAppLoading,
  };
};
