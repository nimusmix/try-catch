import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { accToken, isDarkState, isLoggedInState, toastState } from './recoil';
import { darkTheme, lightTheme } from './styles/theme';
import Toast from './feature/toast/Toast';
import notificationsState, { INotification } from './recoil/notificationsState';
import { API_URL, SITE_URL } from './constant';
import { logOnDev } from './utils/logging';
import elapsedTime from './utils/elapsed-time';
import SEOMetaTag from './components/seo/SEOMetaTag';

const GlobalStyles = createGlobalStyle`
  *{
    transition: background-color 0.3s ease-in;
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

  #notice-list::-webkit-scrollbar{
    width: 6px;
    height: 6px;
  }

  #notice-list::-webkit-scrollbar-thumb,
  body::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: var(--colors-brand-500); /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  #notice-list::-webkit-scrollbar-track,
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
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const acc = useRecoilValue(accToken);

  const [isConnected, setIsConnected] = useState(false); // State to track the connection status
  const [notifications, setNotifications] = useRecoilState(notificationsState);

  const BASE_URL = `https://${API_URL}/v1`;
  const sseEvents = useRef<EventSource | null>(null);

  const connect = useCallback(() => {
    sseEvents.current = new EventSource(`${BASE_URL}/connect?token=${acc}`);
    // connection 되면
    sseEvents.current.addEventListener('open', (e) => {
      logOnDev.log('sse 연결됨');
      setIsConnected(true);
      setNotifications([]);
      logOnDev.dir(e);
    });
    // error 발생시
    sseEvents.current.addEventListener('error', (error: any) => {
      if (error.target?.readyState === EventSource.CLOSED) {
        setIsConnected(false); // Update the isConnected state to false when the 'error' event is triggered and the ready state is CLOSED
        sseEvents.current!.close(); // Close the SSE connection when the 'error' event is triggered
      }
      logOnDev.log('sse 에러');
      logOnDev.log(error);
      setIsConnected(false);
      sseEvents.current!.close();
    });

    sseEvents.current.addEventListener('message', (e) => {
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
  }, [BASE_URL, acc, setNotifications]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    connect();

    // eslint-disable-next-line consistent-return
    return () => {
      logOnDev.log('sse 연결 종료');
      sseEvents.current!.close();
    };
  }, [connect, isLoggedIn, sseEvents]);

  // 재연결
  useEffect(() => {
    let reconnectTimeout: NodeJS.Timeout;
    if (!isConnected && isLoggedIn) {
      reconnectTimeout = setTimeout(() => {
        connect();
      }, 5000);
    }

    return () => {
      clearTimeout(reconnectTimeout);
    };
  }, [connect, isConnected, isLoggedIn]);

  useEffect(() => {
    logOnDev.log('알림 정보');
    logOnDev.log(notifications);
    logOnDev.log('-------------');
  }, [notifications, notifications.length]);

  return (
    <HelmetProvider>
      <SEOMetaTag
        title="트라이캐치"
        description="함께 지식과 경험을 공유하며 좋은 개발자로 성장해요!"
        keywords="개발자,SNS,깃허브,질문,스택오버플로우,블로그,기술블로그,챌린지,웹,개발"
        img={new URL(`/src/assets/thumbnail.png`, import.meta.url).href}
        siteUrl={SITE_URL}
      />
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
