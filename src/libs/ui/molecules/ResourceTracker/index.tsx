import { ReactNode, memo } from "react";
import { StyledResourceTracker } from "./styles";
import { Image, Text, Wrapper } from "../../atoms";
import { numberWithSpaces } from "../../../utils";

interface ResourceTrackerProps {
  image: string;
  count: number;
  action?: ReactNode;
  isSlotItem?: boolean;
}

export const ResourceTracker = memo((props: ResourceTrackerProps) => {
  const { count, image, isSlotItem = false } = props;

  return (
    <StyledResourceTracker isSlotItem={isSlotItem}>
      <Image alt="coins" height="60px" width="60px" url={image} />
      <Wrapper padding="0" minHeight="100%" alignItems="center">
        <Text fw={600}>{numberWithSpaces(count)}</Text>
      </Wrapper>
    </StyledResourceTracker>
  );
});
