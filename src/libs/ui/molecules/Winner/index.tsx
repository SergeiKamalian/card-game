import { memo, useMemo } from "react";

import gold from "../../../assets/images/gold.png";
import silver from "../../../assets/images/silver.png";
import bronze from "../../../assets/images/bronze.png";
import { StyledWinnerImage } from "./styles";

interface WinnerProps {
  winnerPosition: number;
}

export const Winner = memo((props: WinnerProps) => {
  const { winnerPosition } = props;

  const positionsImage = useMemo(() => {
    if (winnerPosition === 1) return gold;
    if (winnerPosition === 2) return silver;
    if (winnerPosition === 3) return bronze;
    //todo
    return bronze;
  }, [winnerPosition]);

  return (
    <StyledWinnerImage src={positionsImage} alt={String(winnerPosition)} />
  );
});
