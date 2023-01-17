import styled, { CSSProperties } from 'styled-components';

const Title = styled.h1<CSSProperties>`
  display: flex;
  align-items: center;
  justify-content: left;
  -webkit-align-items: center; /* Safari 7.0+ */

  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};

  height: ${({ height }) => height || '5rem'};

  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize || `var(--fonts-desktop-heading-4xl)`};
  font-weight: ${({ fontWeight }) => fontWeight || 'bold'};
`;

export default Title;
