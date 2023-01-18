import styled, { CSSProperties } from 'styled-components';

const Input = styled.input<CSSProperties>`
  -webkit-appearance: none; /* Safari and Chrome */
  -moz-appearance: none; /* Firefox */
  appearance: none; /* 네이티브로 지원되는 모양들을 해제하거나 추가 */

  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '0.5rem'};
  height: ${({ height }) => height || '2.0rem'};
  width: ${({ width }) => width || '17.875rem'};
  border: ${({ border }) => border || '1px solid var(--colors-white-100)'};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius || 'var(--borders-radius-base)'};
  background-color: var(--colors-white-500);
  font-size: ${({ fontSize }) => fontSize || 'var(--fonts-body-base)'};

  :focus {
    outline: none;
    box-shadow: var(--shadows-black-lg);
  }
  ::placeholder {
    color: var(--colors-white-100);
  }
`;

export default Input;
