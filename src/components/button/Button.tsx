import styled from 'styled-components';

const designList = {
  brand500: `
    background-color: var(--colors-brand-500);
    color: var(--colors-white-500);
    &:hover {
      background-color: var(--colors-brand-600);
    }
  `,
  brand400: `
    background-color: var(--colors-brand-400);
    color: var(--colors-brand-500);
    &:hover {
      background-color: var(--colors-brand-300);
    }
  `,
  cancel: `
    background-color: var(--colors-white-100);
    color: var(--colors-white-500);
    &:hover {
      background-color: var(--colors-white-200);
    }
  `,
  border: `
    border: 1px solid var(--colors-brand-500);
    background-color: var(--colors-white-500);
    color: var(--colors-brand-500);
    &:hover {
      background-color: var(--colors-brand-500);
      color: var(--colors-white-500);
    }
  `,
};

export type TDesignType = 'brand500' | 'brand400' | 'cancel' | 'border';

const StyledButton = styled.button<{
  designType?: TDesignType;
  fontSize?: string;
  borderRadius?: string;
}>`
  ${({ designType }) => designType && designList[designType]};
  padding: 0.25rem 0.5rem 0.25rem 0.5rem; //4px 8px 4px 8px;
  border-radius: ${({ borderRadius }) => borderRadius || `var(--borders-radius-base)`};
  font-size: ${({ fontSize }) => fontSize || `var(--fonts-body-base)`};
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
  designType: 'brand500',
  fontSize: `var(--fonts-body-base)`,
  borderRadius: `var(--borders-radius-base)`,
};

export default Button;
