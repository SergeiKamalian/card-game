import { memo, useMemo } from "react";
import { Text } from "../../../../../../../ui";
import { StyledGamerComments } from "./styles";

interface GamerCommentsProps {
  position: "attacker" | "defender" | null;
}

export const GamerComments = memo((props: GamerCommentsProps) => {
  const { position } = props;

  const comment = useMemo(() => {
    if (position === "attacker") return "Your turn!";
    return `Opponent's move!`;
  }, [position]);

  return (
    <StyledGamerComments>
      <Text fz={14} fw={600}>{comment}</Text>
    </StyledGamerComments>
  );
});
