import styled from 'styled-components';

export interface ITitleProps {
  margin?: string;
  padding?: string;
  color?: string;
  display?: 'block' | 'inline-block' | 'inline-flex' | 'inline';
  textAlign?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
}

const Title = styled.h1<ITitleProps>`
  display: ${({ display }) => display || 'block'};
  text-align: ${({ textAlign }) => textAlign || 'center'};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  color: ${({ color, theme: { textColor } }) => color || textColor || `var(--colors-black-500)`};

  font-size: var(--fonts-desktop-heading-5xl);
  line-height: var(--lineHights-desktop-heading-5xl);

  @media (max-width: 768px) {
    font-size: var(--fonts-mobile-heading-4xl);
    line-height: var(--lineHights-mobile-heading-4xl);
  }
`;

export default Title;
