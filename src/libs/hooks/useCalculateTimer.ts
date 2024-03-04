import { useEffect, useMemo, useState } from "react";
import { GAMERS_TIMES } from "../constants";
import { setInterval, clearInterval } from "worker-timers";

export const useCalculateTimer = (
  maxTime: string | null,
  position: "attacker" | "defender" | null
) => {
  const [percents, setPercents] = useState(100);

  const positionMaxSeconds = useMemo(() => {
    if (!position) return 0;
    const minutes = {
      attacker: GAMERS_TIMES.ATTACKER,
      defender: GAMERS_TIMES.DEFENDER,
    };
    const currentMinutes = minutes[position];
    return currentMinutes * 60;
  }, [position]);

  useEffect(() => {
    if (!maxTime) return;
    const id = setInterval(() => {
      const targetDate = new Date(maxTime);
      const currentDate = new Date();
      const differenceMs = targetDate.getTime() - currentDate.getTime();
      const remainingSeconds = Math.floor(differenceMs / 1000);
      const remainingPercents = (remainingSeconds / positionMaxSeconds) * 100;
      if (remainingPercents < 0) return;
      setPercents(remainingPercents);
    }, 1000);
    return () => {
      clearInterval(id);
      setPercents(100);
    };
  }, [maxTime, positionMaxSeconds]);
  return percents;
};
