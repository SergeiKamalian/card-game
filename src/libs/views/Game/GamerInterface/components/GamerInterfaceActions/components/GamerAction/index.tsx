import { memo, useMemo } from "react";
import styled from "styled-components";
import { GiCardPlay } from "react-icons/gi";
import { Text } from "../../../../../../../ui";
import { GiCardExchange } from "react-icons/gi";

interface GamerActionProps {
  type: "complete" | "take";
  onClick: () => void;
}

export const GamerAction = memo((props: GamerActionProps) => {
  const { type, onClick } = props;

  const icon = useMemo(() => {
    if (type === "take") return <GiCardPlay color="white" size={25} />;
    return <GiCardExchange color="white" size={25} />;
  }, [type]);

  const textContent = useMemo(() => {
    if (type === "take") return "I give up";
    return "I finished";
  }, [type]);

  return (
    <StyledGameAction onClick={onClick} actionType={type}>
      {icon}
      <Text cursor="pointer" fw={500} fz={18}>
        {textContent}
      </Text>
    </StyledGameAction>
  );
});

const StyledGameAction = styled.button<{ actionType: "complete" | "take" }>`
  width: 100%;
  height: 50px;
  border-radius: 30px;
  background: ${(p) =>
    p.actionType === "complete"
      ? p.theme.colors.success
      : p.theme.colors.error};
  box-shadow: ${(p) => p.theme.shadows.primary};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
