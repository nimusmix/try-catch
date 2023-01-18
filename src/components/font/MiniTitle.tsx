import styled from 'styled-components';
import { ITitleProps } from './Title';

type TSizeType = 'xl' | '2xl' | '3xl';

interface IMiniTitleProps extends ITitleProps {
  sizeType: TSizeType;
}

const sizeList = {
  xl: `
    font-size: var(--fonts-desktop-heading-xl);
    line-height: var(--lineHights-desktop-heading-xl);
  `,

  '2xl': `
    font-size: var(--fonts-desktop-heading-2xl);
    line-height: var(--lineHights-desktop-heading-2xl);
    @media (max-width: 768px) {
      font-size: var(--fonts-mobile-heading-xl);
      line-height: var(--lineHights-mobile-heading-xl);
    }
  `,

  '3xl': `
    font-size: var(--fonts-desktop-heading-3xl);
    line-height: var(--lineHights-desktop-heading-3xl);
    @media (max-width: 768px) {
      font-size: var(--fonts-mobile-heading-2xl);
      line-height: var(--lineHights-mobile-heading-2xl);
    }
  `,
};

const MiniTitle = styled.h3<IMiniTitleProps>`
  display: ${({ display }) => display || 'block'};
  text-align: ${({ textAlign }) => textAlign || 'center'};

  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  color: ${({ theme: { textColor } }) => textColor || `var(--colors-black-500)`};

  ${({ sizeType }) => sizeType && sizeList[sizeType]}
`;

export default MiniTitle;
