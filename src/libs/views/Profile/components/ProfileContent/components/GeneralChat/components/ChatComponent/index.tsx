import { memo, useEffect, useRef } from "react";
import { Message, MessageForm } from "../../../../../../../../ui";
import { StyledChatComponent, StyledChatMessages } from "./styles";
import { useGlobalChat } from "../../../../../../../../hooks";

export const ChatComponent = memo(() => {
  const { sendGlobalMessage, globalChatMessages } = useGlobalChat();

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTo({
      top: chatRef.current.clientHeight,
      behavior: "smooth",
    });
  }, [chatRef, globalChatMessages]);

  return (
    <StyledChatComponent>
      <StyledChatMessages ref={chatRef}>
        {globalChatMessages.map((message) => (
          <Message key={message.writtenAt} message={message} />
        ))}
      </StyledChatMessages>
      <MessageForm onSubmit={sendGlobalMessage} />
    </StyledChatComponent>
  );
});
