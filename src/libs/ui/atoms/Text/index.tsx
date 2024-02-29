import { FC, HTMLAttributes, ReactNode } from 'react';

import { StyledLi, StyledParagraph, StyledSpan } from './styles';

export interface TextProps
  extends HTMLAttributes<
    HTMLParagraphElement | HTMLSpanElement | HTMLLIElement
  > {
  type?: 'p' | 'span' | 'li';
  fz?: number;
  fw?: number;
  align?: 'left' | 'right' | 'center' | 'justify';
  decoration?: 'none' | 'underline' | 'line-through';
  fs?: 'normal' | 'italic';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  isEllipsis?: boolean;
  isNotSelectable?: boolean;
  width?: string;
  margin?: string;
  padding?: string;
  className?: string;
  children: ReactNode;
  cursor?: string;
  lh?: number;
  ls?: number;
}
export const Text: FC<TextProps> = (props) => {
  const { type = 'p', children, ...rest } = props;
  switch (type) {
    case 'li':
      return (
        <StyledLi {...rest}>
          {children}
        </StyledLi>
      );
    case 'span':
      return (
        <StyledSpan {...rest}>
          {children}
        </StyledSpan>
      );
    default:
      return (
        <StyledParagraph {...rest}>
          {children}
        </StyledParagraph>
      );
  }
};
