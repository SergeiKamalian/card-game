import { memo } from "react";
import { Message, MessageForm } from "../../../../../../../../ui";
import { StyledChatComponent, StyledChatMessages } from "./styles";
import { useGlobalChat } from "../../../../../../../../hooks";

export const ChatComponent = memo(() => {
  const { sendGlobalMessage, globalChatMessages } = useGlobalChat();

  return (
    <StyledChatComponent>
      <StyledChatMessages>
        {globalChatMessages.map(message => <Message key={message.writtenAt} message={message} />)}
      </StyledChatMessages>
      <MessageForm onSubmit={sendGlobalMessage} />
    </StyledChatComponent>
  );
});
