import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Navigation from './header/Navigation';
import { TopButton } from '../components';
import useNotifications from '../hooks/useNotifications';
import { logOnDev } from '../utils/logging';
import { accToken, isLoggedInState } from '../recoil';
import { API_URL } from '../constant';

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
  const [sseUrl, setSseUrl] = useState('');
  const isLoggined = useRecoilValue(isLoggedInState);
  const acc = useRecoilValue(accToken);

  useEffect(() => {
    const BASE_URL = `https://${API_URL}/v1`;
    setSseUrl(`${BASE_URL}/connect?token=${acc}`);
  }, [acc]);

  const notifications = useNotifications(sseUrl, isLoggined);

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
