import { memo, useMemo } from "react";
import { Button, Modal, Wrapper } from "../../../../../../ui";
import { FaUserFriends } from "react-icons/fa";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { MdCasino } from "react-icons/md";
import { useTheme } from "styled-components";
import { useProfileControl } from "../../../../../../hooks";
import { MODAL_SIZES, PROFILE_CONTROL_ACTIONS } from "../../../../../../constants";
import { FriendsContent } from "./components";

export const ControlActions = memo(() => {
  const theme = useTheme();

  const { setOpenModal, openModal } = useProfileControl();

  const modalContent = useMemo(() => {
    switch (openModal) {
      case PROFILE_CONTROL_ACTIONS.FRIENDS:
        return <FriendsContent />;
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
        >
          <FaUserFriends color={theme.colors.white} size={25} />
        </Button>
        <Button isCircle circleSize={50}>
          <TbMessageCircle2Filled color={theme.colors.white} size={25} />
        </Button>
        <Button isCircle circleSize={50}>
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
