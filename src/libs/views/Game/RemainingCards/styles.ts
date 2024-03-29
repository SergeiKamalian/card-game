import styled from "styled-components";

export const StyledRemainingCards = styled.div<{ isCenter: boolean }>`
  position: relative;
  min-width: 250px;
  height: 100%;
  zoom: 0.8;
  display: flex;
  align-items: ${p => p.isCenter && 'center'};
  justify-content: ${p => p.isCenter && 'center'};

  > button {
    height: 190px;
    rotate: 93deg;
    position: absolute;
    top: 17%;
    right: 30px;
  }
  > p {
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
  }
`;
export const StyledTrumpWrapper = styled.div`
  height: 190px;
  display: flex;
  width: 100%;
  position: absolute;
  left: 0;
  top: 50%;
  /* justify-content: flex-end; */
  > button {
    rotate: 90deg;
  }
  /* transform: rotate(90deg); */
`;
export const StyledRemainingCardsWrapper = styled.div`
  height: 190px;
  width: 136px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const StyledRemainingCard = styled.div<{ left: number }>`
  position: absolute;
  transform: ${(p) => `translateX(${p.left}px) translateY(${p.left}px)`};
  rotate: ${(p) => `${p.left / 10}deg`};
  > img {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
`;

export const StyledTrumpImage = styled.img`
  height: 100px;
  object-fit: contain;
`;
