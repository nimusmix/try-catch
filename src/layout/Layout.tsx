import styled from 'styled-components';
import Navigation from './header/Navigation';
import { TopButton } from '../components';

export interface ILayoutProps {
  children: React.ReactNode;
}

export const Main = styled.main`
  background-color: ${({ theme: { bgColor } }) => bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > div {
    width: 100%;
  }

  .milkdown {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-400)' : '#fdfdfd'};
    color: ${({ theme: { textColor } }) => textColor};
  }
  .empty-node:before {
    color: ${({ theme: { textColor } }) => textColor};
  }

  .block-handle.milkdown-phvvv > span {
    color: ${({ theme: { textColor } }) => textColor};
  }
`;

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Navigation />
      <Main>{children}</Main>
      <TopButton />
    </>
  );
};

export default Layout;
