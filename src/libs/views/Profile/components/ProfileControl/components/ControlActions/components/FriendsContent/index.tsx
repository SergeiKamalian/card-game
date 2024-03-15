import { memo, useMemo } from "react";
import { Tabs } from "../../../../../../../../ui";
import { AddFriendTab, FriendsRequests, UserFriends } from "./tabs";
import { useUserContext } from "../../../../../../../../contexts";

export const FriendsContent = memo(() => {
  const { user } = useUserContext();

  const tabs = useMemo(
    () => [
      {
        id: 0,
        title: "Friends",
        component: <UserFriends />,
        badge: user?.friends.friendsIds.length,
      },
      {
        id: 1,
        title: "Requests",
        component: <FriendsRequests />,
        badge: user?.friends.requestsIds.length,
      },
      { id: 2, title: "Add a friend", component: <AddFriendTab /> },
    ],
    [user?.friends.friendsIds.length, user?.friends.requestsIds.length]
  );

  return <Tabs tabs={tabs} />;
});
