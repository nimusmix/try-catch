import { useState } from 'react';
import styled from 'styled-components';
import QuestionList from './QuestionList';
import AnswerList from './AnswerList';

interface IMenuOption {
  id: number;
  option: string;
}

const menu = [
  {
    id: 1,
    option: '질문',
  },
  {
    id: 2,
    option: '답변',
  },
  {
    id: 3,
    option: '최근 본 피드',
  },
];

const Ul = styled.ul`
  width: 800px;
  display: flex;
`;

const Li = styled.li`
  text-align: center;
  width: 266.6px;
  height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.textColor100};
  color: ${({ theme }) => theme.textColor100};
  cursor: pointer;
  transition: color, background-color 0.1s ease-in;

  &:hover,
  &.active {
    border-bottom: 2px solid var(--colors-brand-500);
    color: var(--colors-brand-500);
  }
`;

const MyProfileMenu = () => {
  const [activeMenu, setActvieMenu] = useState('질문');
  console.log(activeMenu);

  const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    setActvieMenu(target.innerText);
  };

  return (
    <>
      <Ul>
        {menu.map(({ id, option }: IMenuOption) => {
          return (
            <Li
              key={id}
              onClick={handleMenuClick}
              className={activeMenu === option ? 'active' : ''}
            >
              {option}
            </Li>
          );
        })}
      </Ul>
      {activeMenu === '질문' && <QuestionList />}
      {activeMenu === '답변' && <AnswerList />}
    </>
  );
};

export default MyProfileMenu;
