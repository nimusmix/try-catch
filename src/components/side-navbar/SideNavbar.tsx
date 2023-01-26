import React, { useState } from 'react';
import styled from 'styled-components';
import { MiniTitle } from '..';

interface INavOptions {
  id: number;
  option: string;
}
interface INavbarProps {
  navOptions: Array<INavOptions>;
}

const Item = styled.li`
  width: 180px;
  height: 40px;
  border-radius: var(--borders-radius-base);
  cursor: pointer;
  margin-bottom: 0.5rem;
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

const SideNavbar = ({ navOptions }: INavbarProps) => {
  const [activeNavOption, setActiveNavOption] = useState<string | null>(() => navOptions[0].option);

  const handleNavOptionClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.target as Element;
    const navOptionName = target.getAttribute('data-name');
    setActiveNavOption(navOptionName);
  };
  return (
    <nav>
      <ul>
        {navOptions.map(({ id, option }: INavOptions) => {
          return (
            <Item
              key={id}
              onClick={handleNavOptionClick}
              className={activeNavOption === option ? 'active' : ''}
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
};

export default SideNavbar;
