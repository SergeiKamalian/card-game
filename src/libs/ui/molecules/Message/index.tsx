import { memo, useMemo } from "react";
import { TMessage } from "../../../types";
import { StyledMessage } from "./styles";
import { Image, Text, TruncatedText, Wrapper } from "../../atoms";
import { parseISO, format } from "date-fns";

interface MessageProps {
  message: TMessage;
}

export const Message = memo((props: MessageProps) => {
  const { message } = props;

  const messageWrittenAt = useMemo(() => {
    const date = parseISO(message.writtenAt);
    const formattedTime = format(date, "HH:mm");
    return formattedTime;
  }, [message.writtenAt]);

  return (
    <StyledMessage>
      <Image
        alt={message.userName}
        height="50px"
        width="50px"
        url={message.userAvatarUrl}
        borderRadius="50%"
      />
      <Wrapper padding="2px 0" direction="column" gap={0}>
        <Wrapper padding="0" justifyContent="space-between" minWidth="100%">
          <Text fw={500}>{message.userName}</Text>
          <Text fz={13} color="rgba(255,255,255,0.9)">
            {messageWrittenAt}
          </Text>
        </Wrapper>
        <TruncatedText lineClamp={1}>
          <Text fz={13}>{message.message}</Text>
        </TruncatedText>
      </Wrapper>
    </StyledMessage>
  );
});
