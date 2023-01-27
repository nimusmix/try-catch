import styled from 'styled-components';
import Navigation from './header/Navigation';
import { TopButton } from '../components';

export interface ILayoutProps {
  children: React.ReactNode;
}

const Main = styled.main`
  background-color: ${({ theme: { bgColor } }) => bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
