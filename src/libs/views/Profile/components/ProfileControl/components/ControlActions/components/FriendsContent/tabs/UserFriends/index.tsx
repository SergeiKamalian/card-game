import { memo } from "react";
import { useFriendsContext } from "../../../../../../../../../../contexts/Friends";
import { useMount } from "react-use";
import { StyledActions, StyledWrapper } from "./styles";
import { IconWithCircle, UserInfo } from "../../../../../../../../../../ui";
import { useTheme } from "styled-components";
import { TiUserDeleteOutline } from "react-icons/ti";
import { PiChatsFill } from "react-icons/pi";

export const UserFriends = memo(() => {
  const { initUserFriends, userFriends } = useFriendsContext();
  const { colors } = useTheme();

  useMount(initUserFriends);

  return (
    <StyledWrapper>
      {userFriends.map((user) => (
        <UserInfo
          user={user}
          isUserInfo={false}
          action={
            <StyledActions>
              <IconWithCircle
                size={40}
                icon={<TiUserDeleteOutline size={22} color={colors.white} />}
                onClick={() => console.log(user.id)}
              />
              <IconWithCircle
                size={40}
                icon={<PiChatsFill size={20} color={colors.white} />}
                onClick={() => console.log(user.id)}
              />
            </StyledActions>
          }
        />
      ))}
    </StyledWrapper>
  );
});
