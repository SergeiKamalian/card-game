import { memo } from "react";
import { StyledModalHeader, StyledModalHeaderLeftSlide } from "./styles";
import { Button, Text } from "../../../../atoms";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "styled-components";

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  action?: () => void;
}

export const ModalHeader = memo((props: ModalHeaderProps) => {
  const { onClose, title, action } = props;
  const theme = useTheme();
  return (
    <StyledModalHeader isCenterContent={!onClose}>
      {onClose ? (
        <StyledModalHeaderLeftSlide>
          <button onClick={onClose}>
            <IoMdClose color={theme.colors.white} size={30} />
          </button>
          <Text fz={22} fw={500} color={theme.colors.white}>
            {title}
          </Text>
        </StyledModalHeaderLeftSlide>
      ) : (
        <Text fz={30} fw={500} color={theme.colors.white}>
          {title}
        </Text>
      )}
      {action ? (
        <Button btnType="submit" onClick={action}>
          <Text cursor="pointer">submit</Text>
        </Button>
      ) : null}
    </StyledModalHeader>
  );
});
