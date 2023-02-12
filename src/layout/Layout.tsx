import styled from 'styled-components';
import Navigation from './header/Navigation';
import { TopButton } from '../components';
import { Footer } from './index';

export interface ILayoutProps {
  children: React.ReactNode;
}

export const Main = styled.main`
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
      <Footer />
    </>
  );
};

export default Layout;
