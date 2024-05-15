import { memo } from "react";
import {
  StyledBottomLine,
  StyledLeftGradient,
  StyledLogoWrapper,
  StyledNotificationBody,
  StyledNotificationTitle,
  StyledNotificationWrapper,
  StyledRightGradient,
  StyledTopLine,
} from "./styles";
import logo from "../../../assets/images/logo.png";
import { AnimatePresence } from "framer-motion";
import { useAppContext } from "../../../contexts";

export const Notification = memo(() => {
  const { showNotification } = useAppContext();

  return (
    <AnimatePresence>
      <StyledNotificationWrapper
        initial={{ opacity: 0, y: -70, x: "-50%" }}
        animate={{
          opacity: showNotification ? 1 : 0,
          y: showNotification ? 0 : -70,
          x: "-50%",
        }}
      >
        <StyledNotificationTitle id="notification-title" />
        <StyledNotificationBody id="notification-body" />
        <StyledLeftGradient />
        <StyledRightGradient />
        <StyledBottomLine />
        <StyledTopLine />
        <StyledLogoWrapper>
          <img src={logo} alt="logo" />
        </StyledLogoWrapper>
      </StyledNotificationWrapper>
    </AnimatePresence>
  );
});
