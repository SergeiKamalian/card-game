import { memo } from "react";
import { StyledTimeScale } from "./styles";
import { Text } from "../../../../../../../ui";

interface TimeScaleProps {
  seconds: number;
}

export const TimeScale = memo((props: TimeScaleProps) => {
  const { seconds } = props;

  return (
    <StyledTimeScale>
      <Text>{seconds}</Text>
    </StyledTimeScale>
  );
});
