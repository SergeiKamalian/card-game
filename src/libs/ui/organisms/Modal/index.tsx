import { AnimatePresence } from "framer-motion";
import { ReactNode, memo, useMemo, useRef } from "react";
import { ModalContainer, ModalOverlay, StyledModalBody } from "./styles";
import { MODAL_SIZES, MODAL_WIDTHS, modal } from "../../../constants";
import { useOnClickOutside } from "../../functions";
import { ModalHeader } from "./components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: MODAL_SIZES;
  title: string;
  content: ReactNode;
  action: () => void;
}

export const Modal = memo((props: ModalProps) => {
  const {
    isOpen,
    onClose,
    size = MODAL_SIZES.MEDIUM,
    title,
    content,
    action,
  } = props;
  const modalRef = useRef(null);
  useOnClickOutside({ ref: modalRef, handler: onClose });

  const modalWidth = useMemo(() => MODAL_WIDTHS[size], [size]);

  return (
    <AnimatePresence initial={false} onExitComplete={() => null}>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.2 } }}
        >
          <ModalContainer
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={modalRef}
            id="modal-container"
            modalWidth={modalWidth}
          >
            <ModalHeader action={action} onClose={onClose} title={title} />
            <StyledModalBody>{content}</StyledModalBody>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
});
