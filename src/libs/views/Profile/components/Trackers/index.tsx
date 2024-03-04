import { memo, useState } from "react";
import { StyledLogoutButton, StyledTrackers } from "./styles";
import { Modal, ResourceTracker, Wrapper } from "../../../../ui";
import { useUserContext } from "../../../../contexts";
import coins from "../../../../assets/images/coins.png";
import diamond from "../../../../assets/images/diamond.png";
import { CgLogOut } from "react-icons/cg";
import { MODAL_SIZES } from "../../../../constants";
import { LogoutContent } from "./components";

export const Trackers = memo(() => {
  const { user } = useUserContext();
  const [exitModalIsOpen, setExitModalIsOpen] = useState(false);
  if (!user) return null;
  return (
    <>
      <StyledTrackers>
        <Wrapper padding="0" gap={20}>
          <ResourceTracker count={user.coins} image={coins} />
          <ResourceTracker count={70} image={diamond} />
        </Wrapper>
        <StyledLogoutButton onClick={() => setExitModalIsOpen(true)}>
          <CgLogOut color="white" size={25} />
        </StyledLogoutButton>
      </StyledTrackers>
      <Modal
        content={<LogoutContent />}
        isOpen={exitModalIsOpen}
        onClose={() => setExitModalIsOpen(false)}
        title="Sign out"
        size={MODAL_SIZES.SMALL}
        heightFitContent
      />
    </>
  );
});
