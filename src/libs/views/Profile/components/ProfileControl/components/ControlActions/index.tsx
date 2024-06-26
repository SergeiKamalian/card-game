import { memo, useMemo } from "react";
import { Button, Modal, Wrapper } from "../../../../../../ui";
import { FaUserFriends } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { MdCasino } from "react-icons/md";
import { useTheme } from "styled-components";
import { useProfileControl } from "../../../../../../hooks";
import {
  MODAL_SIZES,
  PROFILE_CONTROL_ACTIONS,
} from "../../../../../../constants";
import { FriendsContent, GamesContent } from "./components";
import { useUserContext } from "../../../../../../contexts";

export const ControlActions = memo(() => {
  const theme = useTheme();

  const { setOpenModal, openModal } = useProfileControl();

  const { user } = useUserContext();

  const modalContent = useMemo(() => {
    switch (openModal) {
      case PROFILE_CONTROL_ACTIONS.FRIENDS:
        return <FriendsContent />;
      case PROFILE_CONTROL_ACTIONS.GAMES:
        return <GamesContent />;
      default:
        return null;
    }
  }, [openModal]);

  return (
    <>
      <Wrapper padding="0" gap={20} minWidth="250px" justifyContent="flex-end">
        <Button
          isCircle
          circleSize={50}
          onClick={() => setOpenModal(PROFILE_CONTROL_ACTIONS.FRIENDS)}
          badge={user?.friends.requestsIds.length}
        >
          <FaUserFriends color={theme.colors.white} size={25} />
        </Button>
        <Button isCircle circleSize={50}>
          <TbMessageCircle2Filled color={theme.colors.white} size={25} />
        </Button>
        <Button
          isCircle
          circleSize={50}
          onClick={() => setOpenModal(PROFILE_CONTROL_ACTIONS.GAMES)}
        >
          <MdCasino color={theme.colors.white} size={25} />
        </Button>
      </Wrapper>
      <Modal
        content={modalContent}
        isOpen={Boolean(openModal)}
        onClose={() => setOpenModal(null)}
        title={openModal || ""}
        size={MODAL_SIZES.LARGE}
      />
    </>
  );
});
