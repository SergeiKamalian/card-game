import { memo } from "react";
import { TUser } from "../../../types";
import { IconWithCircle, Image, Text, Wrapper } from "../../atoms";
import { useTheme } from "styled-components";
import { IoSettingsSharp } from "react-icons/io5";

interface UserInfoProps {
  user: TUser;
}

export const UserInfo = memo((props: UserInfoProps) => {
  const { user } = props;
  const theme = useTheme();

  return (
    <Wrapper gap={15} alignItems="center">
      <Image
        alt={user.name}
        url={user.avatarURL}
        height="60px"
        width="60px"
        borderRadius="50%"
      />

      <Wrapper
        direction="column"
        padding="7px 0"
        justifyContent="center"
        gap={0}
      >
        <Text fw={600}>{user.name}</Text>
        <Wrapper padding="0" justifyContent="center" gap={5}>
          <Text fz={14} color={theme.colors.purpleLight}>
            Level:{" "}
          </Text>
          <Text fz={14} fw={600} color={theme.colors.purpleLight}>
            {user.level}
          </Text>
        </Wrapper>
      </Wrapper>

      <IconWithCircle icon={<IoSettingsSharp color="white" size={20} />} onClick={console.log} size={40} />
    </Wrapper>
  );
});
