import { memo, useMemo } from "react";
import { Wrapper } from "../../../../../ui";
import { StyledStar } from "./styles";
import star from '../../../../../assets/images/star.png'

interface WinnerScaleWithStarsProps {
  place: number;
}

export const WinnerScaleWithStars = memo((props: WinnerScaleWithStarsProps) => {
  const { place } = props;

  const filledStarsCount = useMemo(() => 4 - (place || 4), [place]);

  return (
    <Wrapper padding="0" gap={10}>
      {new Array(filledStarsCount).fill(null).map((_, index) => (
        <StyledStar isFilled key={index} src={star} alt="star" />
      ))}
       {new Array(3 - filledStarsCount).fill(null).map((_, index) => (
        <StyledStar isFilled={false} key={index} src={star} alt="star" />
      ))}
    </Wrapper>
  );
});
