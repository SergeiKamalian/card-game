import { memo } from "react";
import { StyledLevel, StyledLevelImage, StyledLevelWrapper } from "./styles";
import levelImage from "../../../assets/images/level.png";
import { Text } from "../../atoms";

interface LevelProps {
  level: number;
}

export const Level = memo((props: LevelProps) => {
  const { level } = props;
  return (
    <StyledLevel>
        <StyledLevelWrapper><Text>{level}</Text></StyledLevelWrapper>
      <StyledLevelImage src={levelImage} alt="level" />
    </StyledLevel>
  );
});
