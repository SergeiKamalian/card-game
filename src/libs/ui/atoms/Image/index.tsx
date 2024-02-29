import { memo } from "react";
import styled from "styled-components";

interface ImageProps {
  url: string;
  alt: string;
  width: string;
  height: string;
  borderRadius?: string;
}

export const Image = memo((props: ImageProps) => {
  return <StyledImage {...props} src={props.url} />;
});

const StyledImage = styled.img<ImageProps>`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  border-radius: ${(p) => p.borderRadius || "none"};
  object-fit: cover;
`;
