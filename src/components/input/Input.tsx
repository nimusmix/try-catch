import styled from 'styled-components';

interface IInputProps {
  margin?: string;
  padding?: string;
  height?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
  fontSize?: string;
  boxShadow?: string;
}

const Input = styled.input<IInputProps>`
  -webkit-appearance: none; /* Safari and Chrome */
  -moz-appearance: none; /* Firefox */
  appearance: none; /* 네이티브로 지원되는 모양들을 해제하거나 추가 */

  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '0.5rem'};
  height: ${({ height }) => height || '2.0rem'};
  width: ${({ width }) => width || '17.875rem'};
  border: ${({ border }) => border || '1px solid'};
  border-color: ${({ theme: { borderColor } }) => borderColor};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius || 'var(--borders-radius-base)'};
  background-color: ${({ theme: { bgColor } }) => bgColor};
  font-size: ${({ fontSize }) => fontSize || 'var(--fonts-body-base)'};
  color: ${({ theme: { textColor } }) => textColor};

  :focus {
    outline: none;
    box-shadow: ${({ boxShadow }) => boxShadow || 'var(--shadows-black-lg)'};
  }
  ::placeholder {
    color: ${({ theme: { borderColor } }) => borderColor};
  }
`;

export default Input;
