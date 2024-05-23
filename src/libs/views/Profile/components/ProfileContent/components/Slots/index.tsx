import { memo, useState } from "react";
import {
  StyledBackground,
  StyledHoverBlock,
  StyledLogo,
  StyledModalHeader,
  StyledSlots,
  StyledSlotsContent,
} from "./styles";
import bg from "../../../../../../assets/images/slots.webp";
import logo from "../../../../../../assets/slots/logo.png";
import { Modal } from "../../../../../../ui";
import { MODAL_SIZES } from "../../../../../../constants";
import { SlotsModalContent, SlotsModalHeader } from "./components";

export const Slots = memo(() => {
  const [slotsOpen, setSlotsOpen] = useState(false);

  return (
    <>
      <StyledSlots onClick={() => setSlotsOpen(true)}>
        <StyledSlotsContent>
          <StyledBackground className="slots-bg" alt="bg" src={bg} />
          <StyledLogo className="slots-logo" src={logo} alt="logo" />
          <StyledHoverBlock />
        </StyledSlotsContent>
      </StyledSlots>
      <Modal
        isFullscreen
        size={MODAL_SIZES.LARGE}
        content={<SlotsModalContent />}
        isOpen={slotsOpen}
        onClose={() => setSlotsOpen(false)}
        bgImage={bg}
        customHeader={<SlotsModalHeader />}
      />
    </>
  );
});
