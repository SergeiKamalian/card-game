import { ReactNode, memo, useState, useMemo } from "react";
import { TUser } from "../../../types";
import {
  IconWithCircle,
  // IconWithCircle,
  Image,
  Text,
  Wrapper,
} from "../../atoms";
import { useTheme } from "styled-components";
import { IoSettingsSharp } from "react-icons/io5";
import { EditPersonalInformation } from "./components";
import { useUserConnection } from "../../../hooks";

interface UserInfoProps {
  user: TUser;
  action?: ReactNode;
  isUserInfo?: boolean;
}

export const UserInfo = memo((props: UserInfoProps) => {
  const { user, isUserInfo = true, action } = props;
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isConnected = useUserConnection(user.id);

  return (
    <>
      <Wrapper
        gap={15}
        alignItems="center"
        minWidth="250px"
        position="relative"
      >
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
          minWidth="70px"
        >
          <Text fw={600}>{user.name}</Text>
          <Wrapper padding="0" justifyContent="center" gap={5}>
            <Text fz={14} color={colors.purpleLight}>
              Level:
            </Text>
            <Text fz={14} fw={600} color={colors.purpleLight}>
              {user.level}
            </Text>
          </Wrapper>
          {!isUserInfo ? (
            <Text
              color={isConnected ? colors.success : colors.error}
              fz={12}
              fw={500}
            >
              {isConnected ? "Online" : "Offline"}
            </Text>
          ) : null}
        </Wrapper>
        {isUserInfo ? (
          <IconWithCircle
            icon={<IoSettingsSharp color="white" size={20} />}
            onClick={() => setIsOpen(true)}
            size={40}
          />
        ) : null}
        {action}
      </Wrapper>
      <EditPersonalInformation isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
});
