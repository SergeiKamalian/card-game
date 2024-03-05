import { memo, useMemo } from "react";
import { Tabs } from "../../../../../../../../ui";
import { AddFriendTab } from "./tabs";

export const FriendsContent = memo(() => {
  const tabs = useMemo(
    () => [
      {
        id: 0,
        title: "Friends",
        component: <span />,
      },
      { id: 1, title: "Requests", component: <span /> },
      { id: 2, title: "Add a friend", component: <AddFriendTab /> },
    ],
    []
  );

  return <Tabs tabs={tabs} />;
});
