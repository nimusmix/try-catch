import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { MiniTitle } from '../../components';

interface INavbarProps {
  currentOption: string | null;
  handleNavOptionClick: (e: any) => void;
}

const navOptions = [
  {
    id: 1,
    option: '개발',
  },
  {
    id: 2,
    option: '커리어',
  },
  {
    id: 3,
    option: '밸런스 게임',
  },
];

const Item = styled.li`
  width: 180px;
  height: 40px;
  border-radius: var(--borders-radius-base);
  cursor: pointer;
  margin-bottom: 1rem;
  transition: color, background-color 0.1s ease-in;

  &.active,
  &:hover,
  &:active,
  &:focus {
    background-color: var(--colors-brand-200);
    box-shadow: ${({ theme: { isDark } }) =>
      isDark ? 'var(--shadows-brand-xl)' : 'var(--shadows-black-md)'};
  }

  &.active > h3,
  &:hover > h3 {
    color: var(--colors-brand-500);
  }

  & > h3 {
    line-height: 40px;
    color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-brand-100)' : 'var(--colors-black-100)'};
  }
`;
const QnaNavbar = forwardRef(({ currentOption, handleNavOptionClick }: INavbarProps, ref: any) => {
  return (
    <nav ref={ref}>
      <ul>
        {navOptions.map(({ id, option }) => {
          return (
            <Item
              key={id}
              onClick={handleNavOptionClick}
              className={currentOption === option ? 'active' : ''}
            >
              <MiniTitle sizeType="xl" color="var(--colors-black-100)" data-name={option}>
                {option}
              </MiniTitle>
            </Item>
          );
        })}
      </ul>
    </nav>
  );
});

QnaNavbar.displayName = 'QnaNavbar';

export default QnaNavbar;
