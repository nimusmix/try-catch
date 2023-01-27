import React from 'react';
import styled from 'styled-components';

interface ITagProps {
  text: string;
}

const StyledTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0 0.2rem;
  color: ${({ theme: { isDark } }) => (isDark ? '#e2e8f0' : 'var(--colors-black-400)')};
  font-size: 0.9rem;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-400)' : 'var(--colors-brand-100)'};
  border-radius: var(--borders-radius-base);
  padding: 0.7rem 1rem;
  margin-right: 1rem; // loop가 매끄럽게 되기 위해서 gap 대신 margin-right
  box-shadow: ${({ theme: { isDark } }) =>
    isDark
      ? '0 0.1rem 0.2rem rgb(0 0 0 / 20%), 0 0.1rem 0.5rem rgb(0 0 0 / 30%), 0 0.2rem 1.5rem rgb(0 0 0 / 40%)'
      : 'var(--shadows-black-md)'};

  span {
    font-size: 1.2rem;
    color: #64748b;
  }
`;

const Tag = ({ text }: ITagProps) => {
  return (
    <StyledTag>
      <span>#</span>
      {text}
    </StyledTag>
  );
};

export default Tag;
