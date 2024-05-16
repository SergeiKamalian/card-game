import { AnimatePresence } from "framer-motion";
import { memo, useEffect, useState } from "react";
import {
  StyledTimerText,
  StyledTimerTextItem,
  StyledTimerTextItemBorder,
  StyledTimerWrapper,
} from "./styles";
import { useAppContext } from "../../../contexts";

export const Timer = memo(() => {
  const { timerTexts, setTimerTexts } = useAppContext();

  const [activeIndex, setActiveIndex] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!timerTexts.length) setShow(false);
    else setShow(true);
  }, [timerTexts]);

  useEffect(() => {
    if (activeIndex === timerTexts.length || !show) {
      return;
    }
    setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
      if (activeIndex + 1 === timerTexts.length) {
        setShow(false);
        setActiveIndex(0);
        setTimerTexts([])
      }
    }, 1000);
  }, [activeIndex, timerTexts.length, show, setTimerTexts]);

  return (
    <AnimatePresence>
      {show && (
        <StyledTimerWrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.5 } }}
        >
          <StyledTimerText>
            <StyledTimerTextItem>{timerTexts[activeIndex]}</StyledTimerTextItem>
            <StyledTimerTextItemBorder>
              {timerTexts[activeIndex]}
            </StyledTimerTextItemBorder>
          </StyledTimerText>
        </StyledTimerWrapper>
      )}
    </AnimatePresence>
  );
});
