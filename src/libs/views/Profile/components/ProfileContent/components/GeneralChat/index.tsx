import { memo } from "react";
import { StyledGeneralChat } from "./styles";
import { Text, Wrapper } from "../../../../../../ui";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { ChatComponent } from "./components";


export const GeneralChat = memo(() => {
  return (
    <StyledGeneralChat>
      <Wrapper padding="0 0 0 7px" alignItems="center" gap={10} minHeight="45px">
        <MdMarkUnreadChatAlt color="white" size={30} />
        <Text fz={30} fw={500}>
          General chat
        </Text>
      </Wrapper>
      <ChatComponent />
    </StyledGeneralChat>
  );
});
