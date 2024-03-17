import { memo } from "react";
import { useFriendsContext } from "../../../../../../../contexts/Friends";
import { useMount } from "react-use";
import { StyledFriendsModalContent } from "./styles";
import { IconWithCircle, UserInfo } from "../../../../../../../ui";
import { FaUserPlus } from "react-icons/fa6";
import { useGameContext } from "../../../../../../../contexts";

export const FriendsModalContent = memo(() => {
  const { initUserFriends, sendGameRequestToFriend, userFriends } =
    useFriendsContext();

  const { game } = useGameContext();

  useMount(initUserFriends);

  if (!game) return null;

  return (
    <StyledFriendsModalContent>
      {userFriends.map((friend) => (
        <UserInfo
          isUserInfo={false}
          user={friend}
          action={
            <IconWithCircle
              size={50}
              icon={<FaUserPlus size={25} color="white" />}
              onClick={() => sendGameRequestToFriend(friend.id, game.code)}
            />
          }
        />
      ))}
    </StyledFriendsModalContent>
  );
});
