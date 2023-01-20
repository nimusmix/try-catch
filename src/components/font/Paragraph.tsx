import styled, { css } from 'styled-components';

type TSizeType = 'lg' | 'sm' | 'xm' | 'base';

interface IParagraphProps {
  sizeType: TSizeType;
  margin?: string;
  padding?: string;
  color?: string;
  fontWeight?: string;
  display?: 'block' | 'inline-block' | 'inline-flex' | 'inline';
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
}

const sizeList = {
  lg: css`
    font-size: var(--fonts-body-lg);
    line-height: var(--lineHights-body-lg);
  `,
  base: css`
    font-size: var(--fonts-body-base);
    line-height: var(--lineHights-body-base);
  `,

  sm: css`
    font-size: var(--fonts-body-sm);
    line-height: var(--lineHights-body-sm);
  `,

  xm: css`
    font-size: var(--fonts-body-xm);
    line-height: var(--lineHights-body-xm);
  `,
};

const Paragraph = styled.p<IParagraphProps>`
  display: ${({ display }) => display || 'block'};
  text-align: ${({ textAlign }) => textAlign || 'left'};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  color: ${({ theme: { textColor }, color }) => color || textColor || `var(--colors-black-500)`};
  font-weight: ${({ fontWeight }) => fontWeight || '400'};

  ${({ sizeType }) => sizeType && sizeList[sizeType]}
`;

export default Paragraph;
