import { useState } from "react";
import { PROFILE_CONTROL_ACTIONS } from "../constants";

export const useProfileControl = () => {
  const [openModal, setOpenModal] = useState<PROFILE_CONTROL_ACTIONS | null>(
    null
  );

  
  return {
    setOpenModal,
    openModal,
  };
};
