import { ReactNode, memo } from "react";
import { StyledResourceTracker } from "./styles";
import { Image, Text, Wrapper } from "../../atoms";
import { numberWithSpaces } from "../../../utils";

interface ResourceTrackerProps {
  image: string;
  count: number;
  action?: ReactNode;
}

export const ResourceTracker = memo((props: ResourceTrackerProps) => {
  const { count, image } = props;

  return (
    <StyledResourceTracker>
      <Image alt="coins" height="60px" width="60px" url={image} />
      <Wrapper padding="0" minHeight="100%" alignItems="center">
        <Text fw={600}>{numberWithSpaces(count)}</Text>
      </Wrapper>
    </StyledResourceTracker>
  );
});
