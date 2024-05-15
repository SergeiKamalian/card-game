import { useCallback } from "react";
import { useAppContext } from "../../contexts";

export const useNotification = () => {
  const { setShowNotification } = useAppContext();

  const notification = useCallback(
    (text: string, type: "success" | "error" | "info", during?: number) => {
      const notificationTitle = document.getElementById("notification-title");
      const notificationBody = document.getElementById("notification-body");
      if (!notificationTitle || !notificationBody) return;
      notificationTitle.textContent = `${type}!`;
      notificationBody.textContent = text;
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, during || 3000);
    },
    [setShowNotification]
  );

  return notification;
};
