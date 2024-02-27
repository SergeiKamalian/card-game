import styled, { css } from 'styled-components';

const baseStyles = css<{
  type?: 'p' | 'span' | 'li';
  fz?: number;
  align?: 'left' | 'right' | 'center' | 'justify';
  decoration?: 'none' | 'underline' | 'line-through';
  fs?: 'normal' | 'italic';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  color?: string;
  margin?: string;
  padding?: string;
  isEllipsis?: boolean;
  isNotSelectable?: boolean;
  width?: string;
  fw?: number;
  cursor?: string;
}>`
  ${({ fz }) => fz && ` font-size: ${fz}px`};
  ${({ fw }) => fw && ` font-weight: ${fw}`};
  color: ${({ color, theme }) => color || theme.colors.white};
  font-style: ${({ fs }) => fs || 'normal'};
  text-align: ${({ align }) => align || 'left'};
  ${({ transform }) => !!transform && `text-transform: ${transform}`};
  ${({ decoration }) => !!decoration && `text-decoration: ${decoration}`};
  ${({ margin }) => !!margin && `margin: ${margin}`};
  ${({ padding }) => !!padding && `padding: ${padding}`};
  ${({ width }) => !!width && `width: ${width}`};
  ${({ isNotSelectable }) => !!isNotSelectable && 'user-select: none'};
  cursor: ${p => p.cursor || 'auto'};
  ${(p) =>
    p.isEllipsis &&
    `
    display: -webkit-box;
    overflow: hidden;
    word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  `}
`;

const StyledSpan = styled.span`
  ${baseStyles};
`;

const StyledParagraph = styled.p`
  ${baseStyles};
`;

const StyledLi = styled.li`
  ${baseStyles};
`;

export { StyledLi, StyledParagraph, StyledSpan };
