import { useCallback, useMemo, useState } from "react";
import slot1 from "../../../../../../../../assets/slots/1.png";
import slot2 from "../../../../../../../../assets/slots/2.png";
import slot3 from "../../../../../../../../assets/slots/3.png";
import slot4 from "../../../../../../../../assets/slots/4.png";
import slot5 from "../../../../../../../../assets/slots/5.png";
import slot6 from "../../../../../../../../assets/slots/6.png";
import slot7 from "../../../../../../../../assets/slots/7.png";
import slot8 from "../../../../../../../../assets/slots/8.png";
import slot9 from "../../../../../../../../assets/slots/9.png";
import { useMount } from "react-use";

const defaultWinnedValues = {
  vertical: [],
  horizontal: [],
};
interface WinnedLine {
  index: number;
  data: SlotItem[];
}

export interface WinnedLines {
  horizontal: WinnedLine[];
  vertical: WinnedLine[];
}

export interface SlotItem {
  id: number;
  value: number;
  img: string;
}

export type SlotValues = [SlotItem[], SlotItem[], SlotItem[], SlotItem[]];

export const useSlot = () => {
  const [slotValues, setSlotValues] = useState<SlotValues>([[], [], [], []]);
  const [isAnimation, setIsAnimation] = useState(false);
  const [winnedValues, setWinnedValues] =
    useState<WinnedLines>(defaultWinnedValues);
  const [activeBet, setActiveBet] = useState(50);
  const [isWinView, setIsWinView] = useState(false);
  const [lastWin, setLastWin] = useState<null | {
    timestamp: number;
    count: number;
  }>(null);

  const slotAllItems = useMemo(
    () => [
      // { id: 0, value: 1, img: slot1 },
      // { id: 1, value: 2, img: slot2 },
      // { id: 2, value: 3, img: slot3 },
      // { id: 3, value: 4, img: slot4 },
      { id: 4, value: 5, img: slot5 },
      { id: 5, value: 6, img: slot6 },
      { id: 6, value: 7, img: slot7 },
      { id: 7, value: 8, img: slot8 },
      { id: 8, value: 9, img: slot9 },
    ],
    []
  );

  const getRandomSlotItems = useCallback(
    (startValues: SlotItem[]): SlotItem[] => {
      const randomItems = [];
      for (let i = 0; i < 24 - startValues.length; i++) {
        const randomIndex = Math.floor(Math.random() * slotAllItems.length);
        randomItems.push(slotAllItems[randomIndex]);
      }
      return [...randomItems, ...startValues];
    },
    [slotAllItems]
  );

  const randomizeSlotValues = useCallback(() => {
    if (isAnimation) return;
    setIsWinView(false);
    const newSlotValues: SlotValues = [
      getRandomSlotItems(slotValues[0].slice(0, 3)),
      getRandomSlotItems(slotValues[1].slice(0, 3)),
      getRandomSlotItems(slotValues[2].slice(0, 3)),
      getRandomSlotItems(slotValues[3].slice(0, 3)),
    ];
    setSlotValues(newSlotValues);
    setIsAnimation(true);
  }, [isAnimation, getRandomSlotItems, slotValues]);

  useMount(() => {
    const newSlotValues: SlotValues = [
      getRandomSlotItems(slotValues[0].slice(0, 3)),
      getRandomSlotItems(slotValues[1].slice(0, 3)),
      getRandomSlotItems(slotValues[2].slice(0, 3)),
      getRandomSlotItems(slotValues[3].slice(0, 3)),
    ];
    setSlotValues(newSlotValues);
  });

  const checkVerticalLines = useCallback((values: SlotItem[][]) => {
    const winnedVerticalLines = values
      .map((arr, index) => ({ index, data: arr }))
      .filter(({ data }) => {
        const firstValue = data[0].value;
        return data.every((item) => item.value === firstValue);
      });
    return winnedVerticalLines;
  }, []);

  const checkHorizontalLines = useCallback((values: SlotItem[][]) => {
    const numCols = values[0].length;
    const horizontalWinners = Array.from({ length: numCols }, (_, col) => {
      const columnArray = values.map((row) => row[col]);
      return { index: col, data: columnArray };
    }).filter(({ data }) => {
      const firstValue = data[0].value;
      return data.every((item) => item.value === firstValue);
    });
    return horizontalWinners;
  }, []);

  const checkWinStatus = useCallback(
    (values: SlotItem[][]) => {
      const winnedVerticalLines = checkVerticalLines(values);
      const winnedHorizontalLines = checkHorizontalLines(values);
      return {
        horizontal: winnedHorizontalLines,
        vertical: winnedVerticalLines,
      };
    },
    [checkHorizontalLines, checkVerticalLines]
  );

  const handleWin = useCallback(
    (winnedLines: WinnedLines) => {
      const winedLinesCount =
        winnedLines.horizontal.length + winnedLines.vertical.length;
      setLastWin({
        count: winedLinesCount * 3 * activeBet,
        timestamp: Number(new Date()),
      });
      setIsWinView(true);
    },
    [activeBet]
  );

  const checkSlotOnFinish = useCallback(async () => {
    setIsAnimation(false);
    const values = slotValues.map((slot) => slot.slice(0, 3));
    const winnedLines = checkWinStatus(values);
    if (winnedLines.horizontal.length || winnedLines.vertical.length)
      handleWin(winnedLines);
    setWinnedValues(winnedLines);
  }, [checkWinStatus, handleWin, slotValues]);

  return {
    randomizeSlotValues,
    slotValues,
    isAnimation,
    setIsAnimation,
    checkSlotOnFinish,
    winnedValues,
    activeBet,
    setActiveBet,
    isWinView,
    lastWin,
  };
};
