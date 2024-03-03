import { memo, useMemo } from "react";
import { StyledHaveTimeScale, StyledTimeScale } from "./styles";
import { useTheme } from "styled-components";

interface TimeScaleProps {
  percents: number;
}

export const TimeScale = memo((props: TimeScaleProps) => {
  const { percents } = props;
  const theme = useTheme()

  const haveTimeScaleBackground = useMemo(() => {
    if (percents > 65) return theme.colors.success
    if (percents > 25) return theme.colors.warning
    return theme.colors.error
  }, [percents, theme])

  return (
    <StyledTimeScale>
      <StyledHaveTimeScale width={percents} bg={haveTimeScaleBackground} />
    </StyledTimeScale>
  );
});
