import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { accToken, isDarkState, isLoggedInState, toastState } from './recoil';
import { darkTheme, lightTheme } from './styles/theme';
import Toast from './feature/toast/Toast';
import notificationsState, { INotification } from './recoil/notificationsState';
import { API_URL } from './constant';
import { logOnDev } from './utils/logging';
import elapsedTime from './utils/elapsed-time';

const GlobalStyles = createGlobalStyle`
  *{
    transition: background-color 0.2s ease-in;
  }
  #root {
    background-color: ${({ theme: { bgColor } }) => bgColor};
    color: ${({ theme: { textColor } }) => textColor};
    min-width: var(--breakpoints-desktop);
    
  }
  
  body {
    background-color: ${({ theme: { bgColor } }) => bgColor};
    overflow-y: scroll;
  }

  body::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  body::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: var(--colors-brand-500); /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  body::-webkit-scrollbar-track {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-100)' : 'var(--colors-brand-200)'};
  }

  
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App() {
  const isDark = useRecoilValue(isDarkState);
  const { isVisible } = useRecoilValue(toastState);

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
    logOnDev.log('알림 정보');
    logOnDev.log(notifications);
    logOnDev.log('-------------');
  }, [notifications, notifications.length]);

  return (
    <HelmetProvider>
      <Helmet>
        {isDark ? (
          <link href="https://unpkg.com/prism-themes/themes/prism-one-dark.css" rel="stylesheet" />
        ) : (
          <link href="https://unpkg.com/prism-themes/themes/prism-one-light.css" rel="stylesheet" />
        )}
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          {isVisible && <Toast />}
          <GlobalStyles />
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
