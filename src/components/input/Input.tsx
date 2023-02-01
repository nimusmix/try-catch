import styled, { css } from 'styled-components';

export type TDesignType = 'borderAll' | 'borderBottom';
interface IInputProps {
  margin?: string;
  padding?: string;
  height?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
  fontSize?: string;
  boxShadow?: string;
  designType?: TDesignType;
}

const designList = {
  borderAll: css`
    border: 1px solid;
    border-color: ${({ theme: { borderColor } }) => borderColor};
    border-radius: var(--borders-radius-base);
  `,
  borderBottom: css`
    border-radius: none;
    border: none;
    border-bottom: 1px solid;
    box-shadow: none;
    border-color: ${({ theme: { borderColor } }) => borderColor};
  `,
};

const Input = styled.input<IInputProps>`
  -webkit-appearance: none; /* Safari and Chrome */
  -moz-appearance: none; /* Firefox */
  /* 네이티브로 지원되는 모양들을 해제하거나 추가 */
  appearance: none;

  ${({ designType }) => designType && designList[designType]};
  ${({ designType, borderRadius, border }) =>
    !designType &&
    css`
      border: ${border || '1px solid'};
      border-radius: ${borderRadius || 'var(--borders-radius-base)'};
      border-color: ${({ theme: { borderColor } }) => borderColor};
    `};

  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding || '0.5rem'};
  height: ${({ height }) => height || '2.0rem'};
  width: ${({ width }) => width || '17.875rem'};
  box-sizing: border-box;
  background-color: ${({ theme: { bgColor } }) => bgColor};
  font-size: ${({ fontSize }) => fontSize || 'var(--fonts-body-base)'};
  color: ${({ theme: { textColor } }) => textColor};

  :focus {
    outline: none;
    box-shadow: ${({ boxShadow }) => boxShadow || 'none'};
  }
  ::placeholder {
    color: ${({ theme: { borderColor } }) => borderColor};
  }
`;

export default Input;
