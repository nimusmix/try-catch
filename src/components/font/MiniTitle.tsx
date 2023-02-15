import styled, { css } from 'styled-components';
import { ITitleProps } from './Title';

type TSizeType = 'xl' | '2xl' | '3xl';

interface IMiniTitleProps extends ITitleProps {
  sizeType: TSizeType;
}

const sizeList = {
  xl: css`
    font-size: var(--fonts-desktop-heading-xl);
    line-height: var(--lineHights-desktop-heading-xl);
  `,

  '2xl': css`
    font-size: var(--fonts-desktop-heading-2xl);
    line-height: var(--lineHights-desktop-heading-2xl);

    @media (max-width: 600px) {
      font-size: var(--fonts-mobile-heading-xl);
      line-height: var(--lineHights-mobile-heading-xl);
    }
  `,

  '3xl': css`
    font-size: var(--fonts-desktop-heading-3xl);
    line-height: var(--lineHights-desktop-heading-3xl);

    @media (max-width: 600px) {
      font-size: var(--fonts-mobile-heading-2xl);
      line-height: var(--lineHights-mobile-heading-2xl);
    }
  `,
};

const MiniTitle = styled.h3<IMiniTitleProps>`
  display: ${({ display }) => display || 'block'};
  text-align: ${({ textAlign }) => textAlign || 'center'};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  color: ${({ color, theme: { textColor } }) => color || textColor || `var(--colors-black-500)`};
  
  .emph{
    color ${({ theme: { brandColor } }) => brandColor};
    font-weight: 800;
  }
  
  .blue {
    color ${({ theme: { brandColor } }) => brandColor}
  }

  ${({ sizeType }) => sizeType && sizeList[sizeType]}
`;

export default MiniTitle;
