import { memo } from "react";
import { TGame } from "../../../../../types";
import { Text, Wrapper } from "../../../../../ui";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { useTheme } from "styled-components";

interface GameStartingInformationProps {
  game: TGame;
}

export const GameStartingInformation = memo(
  (props: GameStartingInformationProps) => {
    const { game } = props;
    const { colors } = useTheme();

    return (
      <Wrapper direction="column" padding="0" alignItems="center" gap={0}>
        <Wrapper alignItems="center">
          <LiaHourglassStartSolid color={colors.white} size={60} />
          <Text fz={50} fw={700}>
            Joining
          </Text>
        </Wrapper>
        <Wrapper direction="column" alignItems="center">
          <Wrapper gap={10} padding="0">
            <Text fz={25}>Game code:</Text>
            <Text fz={25} fw={700}>
              {game.code}
            </Text>
          </Wrapper>
          <Wrapper gap={10} padding="0">
            <Text fz={25}>Coins:</Text>
            <Text fz={25} fw={700}>
              {game.coins}
            </Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
    );
  }
);
