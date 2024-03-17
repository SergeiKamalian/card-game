import { memo } from "react";
import { Modal } from "../../../../../ui";
import { FriendsModalContent } from "./components";

interface GameStartingFriendsModalProps {
  isOpen: boolean;
  setFriendsModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GameStartingFriendsModal = memo(
  (props: GameStartingFriendsModalProps) => {
    const { isOpen, setFriendsModalIsOpen } = props;

    return (
      <Modal
        content={<FriendsModalContent />}
        isOpen={isOpen}
        onClose={() => setFriendsModalIsOpen(false)}
        title="Friends"
      />
    );
  }
);
