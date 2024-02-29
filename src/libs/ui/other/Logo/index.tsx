import { memo } from "react";
import logo from "../../../assets/images/logo.png";
import { Image, Text, Wrapper } from "../../atoms";
import { useTheme } from "styled-components";
import { StyledLogo } from "./styles";

interface LogoProps {
  size?: "large" | "normal";
}

export const Logo = memo((props: LogoProps) => {
  const { size = "normal" } = props;
  const theme = useTheme();

  return (
    <StyledLogo size={size}>
      <Wrapper padding="0" gap={15}>
        <Image alt="logo" height="70px" width="auto" url={logo} />
        <Wrapper padding="0" direction="column" justifyContent="center">
          <Text fw={700} fz={30} lh={25}>
            DURAK
          </Text>
          <Text color={theme.colors.purpleLight} fw={400} lh={10} ls={10}>
            ONLINE
          </Text>
        </Wrapper>
      </Wrapper>
    </StyledLogo>
  );
});
