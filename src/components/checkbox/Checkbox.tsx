import React from 'react';
import styled from 'styled-components';

export interface ICheckboxProps {
  label: string | number;
  checked: boolean;
  children?: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledLabel = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  &:before {
    display: inline-block;
    content: '';
    height: 1.5rem;
    width: 1.5rem;
    background-color: var(--colors-brand-100);
    border: 2px solid var(--colors-brand-500);
    border-radius: 0.25rem;
  }
  /* &:hover:before {
    background-color: transparent;
  } */
  &:after {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: block;
    opacity: 0;
    content: '';
    height: 1.5rem;
    width: 1.5rem;
    border: 2px solid transparent;
    border-radius: 0.35rem;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--colors-brand-500);
  }
`;

const StyledInput = styled.input`
  position: absolute;
  margin-right: 0.5rem;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  width: 1px;
  &:checked + ${StyledLabel} {
    :after {
      opacity: 1;
    }
  }
`;

// const StyledP = styled.p`
//   margin-left: 0.5rem;
// `;

const Checkbox = ({ label, checked, children, onChange }: ICheckboxProps) => {
  const stringLabel = String(label);

  return (
    <>
      <StyledInput
        type="checkbox"
        id={stringLabel}
        name={stringLabel}
        checked={checked}
        onChange={onChange}
      />
      <StyledLabel htmlFor={stringLabel}>{children}</StyledLabel>
    </>
  );
};

export default Checkbox;
