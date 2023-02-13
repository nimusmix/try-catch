import React from 'react';
import styled from 'styled-components';
import { Div } from '../index';

const Card = styled(Div)<{ width?: string }>`
  padding: 2rem 3rem 1rem;
  border: none;
  width: ${({ width }) => width || '50%'};
  box-shadow: ${({ theme: { isDark } }) =>
    isDark
      ? 'rgb(59 130 246 / 6%) 0 0 0 0.05rem, rgb(39 110 226 / 4%) 0 0 1.25rem'
      : 'rgb(8 60 130 / 6%) 0 0 0 0.05rem, rgb(30 34 40 / 4%) 0 0 1.25rem'};

  cursor: pointer;
  transition: box-shadow 0.5s ease, translate 0.5s ease;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'rgba(46, 52, 64, 1)' : 'var(--colors-white-500)'};

  &:hover {
    box-shadow: ${({ theme: { isDark } }) =>
      isDark
        ? 'var(--shadows-brand)'
        : 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'};
    translate: 1px 1px;
  }
`;

export default Card;
