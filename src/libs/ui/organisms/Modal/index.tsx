import { AnimatePresence } from "framer-motion";
import { ReactNode, memo, useMemo, useRef } from "react";
import {
  ModalContainer,
  ModalOverlay,
  StyledBgImage,
  StyledCloseButton,
  StyledContent,
  StyledInnerContent,
  StyledInnerContentBg,
  StyledModalContainerContent,
} from "./styles";
import { MODAL_SIZES, MODAL_WIDTHS, modal } from "../../../constants";
import { useOnClickOutside } from "../../functions";
import { ModalHeader } from "./components";
import bg from "../../../assets/images/bgImage.webp";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  size?: MODAL_SIZES;
  title: string;
  content: ReactNode;
  heightFitContent?: boolean;
}

export const Modal = memo((props: ModalProps) => {
  const {
    isOpen,
    onClose,
    size = MODAL_SIZES.MEDIUM,
    title,
    heightFitContent = false,
    content,
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
            id="modal-container"
          >
            <StyledModalContainerContent
              modalWidth={modalWidth}
              heightFitContent={heightFitContent}
              ref={modalRef}
            >
              <ModalHeader title={title} />
              <StyledInnerContent>
                <StyledInnerContentBg src={bg} />
                <StyledContent>{content}</StyledContent>
              </StyledInnerContent>
              <StyledBgImage src={bg} />
              {onClose ? (
                <StyledCloseButton onClick={onClose}>
                  <IoMdClose size={30} />
                </StyledCloseButton>
              ) : null}
            </StyledModalContainerContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
});
