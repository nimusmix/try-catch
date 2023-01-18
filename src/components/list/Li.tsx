import styled, { CSSProperties } from 'styled-components';

const li = styled.li<CSSProperties>`
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: ${({ fontSize }) => fontSize || 'var(--fonts-body-base)'};
  padding: ${({ padding }) => padding || '0.5rem'};
  height: ${({ height }) => height || '5rem'};
  border: ${({ border }) => border || '1px solid var(--colors-white-100)'};
  border-radius: ${({ borderRadius }) => borderRadius || 'var(--borders-radius-base)'};
`;

export default li;
