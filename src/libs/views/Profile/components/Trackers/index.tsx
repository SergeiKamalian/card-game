import { memo } from "react";
import { StyledTrackers } from "./styles";
import { ResourceTracker } from "../../../../ui";
import { useUserContext } from "../../../../contexts";
import coins from '../../../../assets/images/coins.png'
import diamond from '../../../../assets/images/diamond.png'

export const Trackers = memo(() => {
  const { user } = useUserContext();
    if (!user) return null;
  return (
    <StyledTrackers>
      <ResourceTracker count={user.coins} image={coins} />
      <ResourceTracker count={70} image={diamond} />
    </StyledTrackers>
  );
});
