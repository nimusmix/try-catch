import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100px;
  height: 100px;
  background-color: var(--colors-brand-500);
`;

interface IButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: IButtonProps) => {
  return <StyledButton>{children}</StyledButton>;
};

export default Button;
