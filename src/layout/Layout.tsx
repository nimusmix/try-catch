import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Navigation from './header/Navigation';
import { TopButton } from '../components';

export interface ILayoutProps {
  children: React.ReactNode;
}

export const Main = styled.main<{ path: string }>`
  background-color: ${({ theme: { bgColor } }) => bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Layout = ({ children }: ILayoutProps) => {
  const { pathname } = useLocation();

  return (
    <>
      <Navigation />
      <Main path={pathname}>{children}</Main>
      <TopButton />
    </>
  );
};

export default Layout;
