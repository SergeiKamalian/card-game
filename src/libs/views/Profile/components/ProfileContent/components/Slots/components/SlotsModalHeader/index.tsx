import { memo } from "react";
import { StyledSlotsModalHeader } from "./styles";
import { StyledModalHeader } from "../../styles";
import logo from "../../../../../../../../assets/slots/logo.png";
import slotCoins from "../../../../../../../../assets/images/coins.png";
import { ResourceTracker } from "../../../../../../../../ui";

export const SlotsModalHeader = memo(() => {
  return (
    <StyledSlotsModalHeader>
      <ResourceTracker count={10000} image={slotCoins} isSlotItem />
      {/* <StyledModalHeader className="slots-logo" src={logo} alt="logo" /> */}
      <div style={{ width: 130 }}></div>
    </StyledSlotsModalHeader>
  );
});
