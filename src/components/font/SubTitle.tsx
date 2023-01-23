import styled from 'styled-components';
import { ITitleProps } from './Title';

const SubTitle = styled.h2<ITitleProps>`
  display: ${({ display }) => display || 'block'};
  text-align: ${({ textAlign }) => textAlign || 'center'};

  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  color: ${({ color, theme: { textColor } }) => color || textColor || `var(--colors-black-500)`};

  font-size: var(--fonts-desktop-heading-4xl);
  line-height: var(--lineHights-desktop-heading-4xl);
  font-weight: ${({ fontWeight }) => fontWeight || '600'};
  @media (max-width: 768px) {
    font-size: var(--fonts-mobile-heading-3xl);
    line-height: var(--lineHights-mobile-heading-3xl);
  }
`;

export default SubTitle;
