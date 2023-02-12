import styled from 'styled-components';
import { useEffect } from 'react';
import Navigation from './header/Navigation';
import { TopButton } from '../components';
import useNotifications from '../hooks/useNotifications';
import { logOnDev } from '../utils/logging';

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
  const notifications = useNotifications();
  useEffect(() => {
    logOnDev.log(notifications);
  }, [notifications, notifications.length, children]);
  return (
    <>
      <Navigation />
      <Main>{children}</Main>
      <TopButton />
    </>
  );
};

export default Layout;
