import { memo, useState, useEffect } from "react";
import { useFriendsContext } from "../../../../../../../contexts/Friends";
import { useMount } from "react-use";
import { StyledFriendsModalContent } from "./styles";
import { IconWithCircle, UserInfo } from "../../../../../../../ui";
import { FaUserPlus } from "react-icons/fa6";
import { useGameContext } from "../../../../../../../contexts";
import { checkUserConnectionStatus } from "../../../../../../../utils";

export const FriendsModalContent = memo(() => {
  const { initUserFriends, sendGameRequestToFriend, userFriends } =
    useFriendsContext();

  const [friendsStatuses, setFriendsStatuses] = useState<boolean[]>([]);

  useEffect(() => {
    const updateFriendsStatuses = async () => {
      const promises = userFriends.map(async (friend) => {
        const userStatus = await checkUserConnectionStatus(friend.id);
        return !userStatus;
      });

      const statuses = await Promise.all(promises);
      setFriendsStatuses(statuses);
    };
    updateFriendsStatuses();
  }, [userFriends]);

  const { game } = useGameContext();

  useMount(initUserFriends);

  if (!game) return null;

  return (
    <StyledFriendsModalContent>
      {userFriends.map((friend, index) => (
        <UserInfo
          isUserInfo={false}
          user={friend}
          action={
            <IconWithCircle
              size={50}
              icon={<FaUserPlus size={25} color="white" />}
              onClick={() => sendGameRequestToFriend(friend.id, game.code)}
              isDisabled={friendsStatuses[index]}
            />
          }
        />
      ))}
    </StyledFriendsModalContent>
  );
});
