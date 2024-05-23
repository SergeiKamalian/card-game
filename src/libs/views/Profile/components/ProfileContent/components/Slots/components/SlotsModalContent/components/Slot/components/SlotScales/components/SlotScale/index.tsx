import { memo, useCallback, useEffect, useMemo } from "react";
import {
  StyledSlotItem,
  StyledSlotItemsGroup,
  StyledSlotScale,
} from "./styles";
import { Image } from "../../../../../../../../../../../../../../ui";
import { SlotItem, WinnedLines } from "../../../../../../useSlot";
import { useAnimation } from "framer-motion";

interface SlotScaleProps {
  item: SlotItem[];
  index: number;
  isAnimation: boolean;
  setIsAnimation: (value: boolean) => void;
  checkSlotOnFinish: () => Promise<void>;
  winnedValues: WinnedLines;
  isWinView: boolean;
}

export const SlotScale = memo((props: SlotScaleProps) => {
  const {
    item,
    index,
    isAnimation,
    setIsAnimation,
    checkSlotOnFinish,
    winnedValues,
    isWinView,
  } = props;

  const controls = useAnimation();

  useEffect(() => {
    if (!isAnimation) return;
    controls.set({ top: "calc(-700% - 14px)" });
    setTimeout(() => {
      controls
        .start({
          top: "0%",
          transition: {
            stiffness: 50,
            duration: 2,
          },
        })
        .then(() => {
          if (index !== 3) return;
          checkSlotOnFinish();
        });
    }, index * 200 + 50);
  }, [isAnimation, index, controls, setIsAnimation, checkSlotOnFinish]);

  const verticalIsWinned = useMemo(
    () => winnedValues.vertical.find((i) => i.index === index),
    [index, winnedValues]
  );

  const checkHorizontalWin = useCallback(
    (index: number) => {
      return winnedValues.horizontal.find(
        (i) => i.index === Math.abs(24 - 3 - index) || i.index === index
      );
    },
    [winnedValues.horizontal]
  );

  const getClass = useCallback(
    (index: number) => {
      if (!isWinView) return undefined;
      if (verticalIsWinned || checkHorizontalWin(index)) return "winnedItem";
      return undefined;
    },
    [checkHorizontalWin, isWinView, verticalIsWinned]
  );

  return (
    <StyledSlotScale>
      <StyledSlotItemsGroup
        initial={{ top: "calc(-700% - 14px)" }}
        animate={controls}
      >
        {item.map((value, index) => (
          <StyledSlotItem className={getClass(index)} key={index}>
            <Image
              alt={`${value.value}`}
              height="85%"
              width="85%"
              objectFit="contain"
              url={value.img}
            />
          </StyledSlotItem>
        ))}
      </StyledSlotItemsGroup>
    </StyledSlotScale>
  );
});
