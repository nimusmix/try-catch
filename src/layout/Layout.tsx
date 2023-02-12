import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Navigation from './header/Navigation';
import { TopButton } from '../components';
import { logOnDev } from '../utils/logging';
import { accToken, isLoggedInState } from '../recoil';
import { API_URL } from '../constant';
import notificationsState, { INotification } from '../recoil/notificationsState';
import elapsedTime from '../utils/elapsed-time';

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
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const acc = useRecoilValue(accToken);
  const [notifications, setNotifications] = useRecoilState(notificationsState);
  useEffect(() => {
    const BASE_URL = `https://${API_URL}/v1`;
    setSseUrl(`${BASE_URL}/connect?token=${acc}`);
  }, [acc]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    // 이벤트를 전달 받기 위해서 서버로 접속을 시작하려면 우선, 이벤트를 생성하는 서버측 스크립트를 URI로 지정하여 새로운 EventSource 객체를 생성한다
    // EventSource 생성자에 전달 된 URL이 절대 URL 인 경우 해당 출처 (scheme, domain, port)가 호출 페이지의 출처와 일치해야 한다.
    const sseEvents = new EventSource(sseUrl);
    // connection 되면
    sseEvents.addEventListener('open', (e) => {
      logOnDev.log('sse 연결됨');
      logOnDev.dir(e);
    });
    // error 발생시
    sseEvents.addEventListener('error', (e) => {
      logOnDev.log('sse 에러');
      logOnDev.log(e);
      sseEvents.close();
    });

    sseEvents.addEventListener('message', (e) => {
      logOnDev.log('sse message 이벤트');
      const data = JSON.parse(e.data);
      switch (data.type) {
        // 팔로우
        case 'follow':
          {
            const followNotification: INotification = {
              ...data,
              timestamp: elapsedTime(data.timestamp),
              title: `${data.title}님이 팔로우 했어요`,
            };
            setNotifications((prevNotification) => [followNotification, ...prevNotification]);
          }
          break;

        // 답변 채택
        case 'answerAcceptance':
          {
            const answerAcceptanceNotification: INotification = {
              ...data,
              timestamp: elapsedTime(data.timestamp),
              title: `${data.title}글에 작성한 답변이 채택됐어요`,
            };
            setNotifications((prevNotification) => [
              answerAcceptanceNotification,
              ...prevNotification,
            ]);
          }
          break;

        // 내 글에 답변 등록
        case 'answerRegistration':
          {
            const answerRegistrationNotification: INotification = {
              ...data,
              timestamp: elapsedTime(data.timestamp),
              title: `${data.title}글에 누군가 답변을 해줬어요`,
            };
            setNotifications((prevNotification) => [
              answerRegistrationNotification,
              ...prevNotification,
            ]);
          }
          break;
        default:
          break;
      }
    });

    // eslint-disable-next-line consistent-return
    return () => {
      logOnDev.log('sse 연결 종료');
      sseEvents.close();
    };
  }, [isLoggedIn, setNotifications, sseUrl]);

  useEffect(() => {
    logOnDev.log('알림 정보', notifications);
  }, [notifications, notifications.length]);

  return (
    <>
      <Navigation />
      <Main>{children}</Main>
      <TopButton />
    </>
  );
};

export default Layout;
