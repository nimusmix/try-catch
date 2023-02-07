import React from 'react';
import styled, { css } from 'styled-components';

export type TDesignType =
  | 'blueFill'
  | 'blueEmpty'
  | 'skyFill'
  | 'purpleFill'
  | 'purpleEmpty'
  | 'greenFill'
  | 'greenEmpty'
  | 'redFill'
  | 'redEmpty'
  | 'grayFill'
  | 'grayEmpty';

interface IButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  designType?: TDesignType;
  fontSize?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  width?: string;
}

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

  redFill: css`
    background-color: var(--colors-red-500);
    color: var(--colors-white-500);
    border: 0.8px var(--colors-red-500) solid;
    &:hover {
      background-color: var(--colors-red-600);
      border: 0.8px var(--colors-red-600) solid;
    }
  `,

  redEmpty: css`
    background-color: transparent;
    color: var(--colors-red-500);
    border: 0.8px var(--colors-red-500) solid;
    &:hover {
      color: var(--colors-red-600);
      border: 0.8px var(--colors-red-600) solid;
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

const Button = styled.button<IButtonProps>`
  ${({ designType }) => designType && designList[designType]};
  display: inline-flex;
  width: ${({ width }) => width || ''};
  justify-content: center;
  align-items: center;
  font-size: ${({ fontSize }) => fontSize || 'var(--fonts-body-base)'};
  padding: ${({ padding }) => padding || '0.25rem 0.8rem'};
  margin: ${({ margin }) => margin};
  border-radius: ${({ borderRadius }) => borderRadius || 'var(--borders-radius-base'};
  cursor: pointer;
`;

Button.defaultProps = {
  designType: 'blueFill',
  fontSize: `var(--fonts-body-base)`,
  padding: '0.25rem 0.8rem',
  borderRadius: `var(--borders-radius-base)`,
};

export default Button;
