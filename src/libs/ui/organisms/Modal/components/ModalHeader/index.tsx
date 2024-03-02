import { memo } from "react";
import { StyledModalHeader, StyledModalHeaderLeftSlide } from "./styles";
import { Button, Text } from "../../../../atoms";
import { IoMdClose } from "react-icons/io";
import { useTheme } from "styled-components";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  action: () => void;
}

export const ModalHeader = memo((props: ModalHeaderProps) => {
  const { onClose, title, action } = props;
  const theme = useTheme();
  return (
    <StyledModalHeader>
      <StyledModalHeaderLeftSlide>
        <button onClick={onClose}>
          <IoMdClose color={theme.colors.white} size={30} />
        </button>
        <Text fz={22} fw={500} color={theme.colors.white}>
          {title}
        </Text>
      </StyledModalHeaderLeftSlide>
      <Button btnType="submit" onClick={action}>
        <Text cursor="pointer">Save</Text>
      </Button>
    </StyledModalHeader>
  );
});
