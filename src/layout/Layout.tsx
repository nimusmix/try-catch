import styled from 'styled-components';
import Navigation from './header/Navigation';

export interface ILayoutProps {
  children: React.ReactNode;
}

const Main = styled.main`
  background-color: ${({ theme: { bgColor } }) => bgColor};
  max-width: var(--breakpoints-desktop);
  min-width: var(--breakpoints-desktop);
  margin: 0 auto;

  @media (max-width: 768px) {
    min-width: auto;
  }
`;

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Navigation />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
