import styled, { css } from 'styled-components';

const designList = {
  blueFill: css`
    background-color: var(--colors-brand-500);
    color: var(--colors-white-500);
    border: 0.8px var(--colors-brand-500) solid;
    &:hover {
      background-color: var(--colors-brand-600);
      border: 0.8px var(--colors-brand-600) solid;
    }
  `,
  blueEmpty: css`
    background-color: transparent;
    color: var(--colors-brand-500);
    border: 0.8px var(--colors-brand-500) solid;
    &:hover {
      color: var(--colors-brand-600);
      border: 0.8px var(--colors-brand-600) solid;
    }
  `,
  skyFill: css`
    background-color: var(--colors-brand-100);
    color: var(--colors-black-100);
    border: 0.8px var(--colors-brand-100) solid;
    &:hover {
      background-color: var(--colors-brand-200);
      border: 0.8px var(--colors-brand-200) solid;
    }
  `,
  purpleFill: css`
    background-color: var(--colors-emph-500);
    color: var(--colors-white-500);
    border: 0.8px var(--colors-emph-500) solid;
    &:hover {
      background-color: var(--colors-emph-200);
      border: 0.8px var(--colors-emph-200) solid;
    }
  `,
  purpleEmpty: css`
    background-color: transparent;
    color: var(--colors-emph-500);
    border: 0.8px var(--colors-emph-500) solid;
    &:hover {
      color: var(--colors-emph-200);
      border: 0.8px var(--colors-emph-200) solid;
    }
  `,
  greenFill: css`
    background-color: ${({ theme: { successColor } }) => successColor};
    color: var(--colors-white-500);
    border: 0.8px ${({ theme: { successColor } }) => successColor} solid;
    cursor: default;
  `,
  greenEmpty: css`
    background-color: transparent;
    color: ${({ theme: { successColor } }) => successColor};
    border: 0.8px ${({ theme: { successColor } }) => successColor} solid;
    cursor: default;
  `,
  grayFill: css`
    background-color: var(--colors-white-400);
    color: var(--colors-black-100);
    border: 0.8px var(--colors-white-400) solid;
    &:hover {
      background-color: var(--colors-white-200);
      border: 0.8px var(--colors-white-200) solid;
    }
  `,
  grayEmpty: css`
    background-color: transparent;
    color: var(--colors-white-400);
    border: 0.8px var(--colors-white-400) solid;
    &:hover {
      color: var(--colors-white-200);
      border: 0.8px var(--colors-white-200) solid;
    }
  `,
};

export type TDesignType =
  | 'blueFill'
  | 'blueEmpty'
  | 'skyFill'
  | 'purpleFill'
  | 'purpleEmpty'
  | 'greenFill'
  | 'greenEmpty'
  | 'grayFill'
  | 'grayEmpty';

const StyledButton = styled.button<{
  designType?: TDesignType;
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
}>`
  ${({ designType }) => designType && designList[designType]};
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  border-radius: ${({ borderRadius }) => borderRadius || 'var(--borders-radius-base)'};
  font-size: ${({ fontSize }) => fontSize || 'var(--fonts-body-base)'};
`;

interface IButtonProps {
  children: React.ReactNode;
  designType?: TDesignType;
  fontSize?: string;
  borderRadius?: string;
}

const Button = ({ children, designType, fontSize, borderRadius }: IButtonProps) => {
  return (
    <StyledButton designType={designType} fontSize={fontSize} borderRadius={borderRadius}>
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  designType: 'blueFill',
  fontSize: `var(--fonts-body-base)`,
  borderRadius: `var(--borders-radius-base)`,
};

export default Button;
