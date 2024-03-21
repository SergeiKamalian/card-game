import { memo } from "react";
import { useFriendsContext } from "../../../../../../../../../../contexts/Friends";
import { useMount } from "react-use";
import {
  IconWithCircle,
  UserInfo,
} from "../../../../../../../../../../ui";
import { StyledWrapper } from "./styles";
import { MdDone } from "react-icons/md";
import { useTheme } from "styled-components";
import { IoMdClose } from "react-icons/io";

export const FriendsRequests = memo(() => {
  const {
    initFriendsRequests,
    friendsRequests,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useFriendsContext();

  const { colors } = useTheme();

  useMount(initFriendsRequests);

  return (
    <StyledWrapper>
      {friendsRequests.map((user) => (
        <UserInfo
          user={user}
          isUserInfo={false}
          action={
            <StyledWrapper>
              <IconWithCircle
                size={40}
                icon={<MdDone size={25} color={colors.success} />}
                onClick={() => acceptFriendRequest(user.id)}
              />
              <IconWithCircle
                size={40}
                icon={<IoMdClose size={25} color={colors.error} />}
                onClick={() => rejectFriendRequest(user.id)}
              />
            </StyledWrapper>
          }
        />
      ))}
    </StyledWrapper>
  );
});
