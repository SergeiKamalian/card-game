import { memo, useMemo } from "react";
import { Text } from "../../../../../../../ui";
import { StyledGamerComments } from "./styles";
import { useTheme } from "styled-components";

interface GamerCommentsProps {
  position: "attacker" | "defender" | null;
}

export const GamerComments = memo((props: GamerCommentsProps) => {
  const { position } = props;
  
  const {colors} = useTheme()
  const comment = useMemo(() => {
    if (position === "attacker") return "Your turn!";
    return `Opponent's move!`;
  }, [position]);

  const color = useMemo(() => {
    if (position === "attacker") return colors.success;
    return colors.error;
  }, [colors.error, colors.success, position])

  return (
    <StyledGamerComments>
      <Text color={color} fz={14} fw={600}>{comment}</Text>
    </StyledGamerComments>
  );
});
