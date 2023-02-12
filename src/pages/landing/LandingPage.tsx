import styled, { keyframes } from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Layout from '../../layout/Layout';
import MarqueeLogoCard from '../../feature/landing/marquee-logo-wall/MarqueeLogoCard';
import LandingTitle from '../../feature/landing/landing-title/LandingTitle';
import { ReactComponent as LogoDarkTheme } from '../../assets/vertical_logo_dark_theme.svg';
import { ReactComponent as LogoLightTheme } from '../../assets/vertical_logo_light_theme.svg';
import { accToken, isDarkState, isLoggedInState, refToken } from '../../recoil';
import { QuestionPageBody } from '../qna/QnaPage';
import IntroSection from '../../feature/landing/Sections/IntroSection';
import QnASection from '../../feature/landing/Sections/QnASection';
import FeedSection from '../../feature/landing/Sections/FeedSection';
import RoadmapSection from '../../feature/landing/Sections/RoadmapSection';
import ChallengeSection from '../../feature/landing/Sections/ChallengeSection';
import { logOnDev } from '../../utils/logging';
import elapsedTime from '../../utils/elapsed-time';
import { API_URL } from '../../constant';
import notificationsState from '../../recoil/notificationsState';

export interface INotification {
  id: number;
  from: number;
  type: 'follow' | 'answerAcceptance' | 'answerRegistration';
  title: string;
  timestamp: number;
}

const LandingPageBody = styled(QuestionPageBody)`
  flex-direction: column;
`;

const bounceInTop = keyframes`
  0% {
  -webkit-transform: translateY(-500px);
  transform: translateY(-500px);
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in;
  opacity: 0;
}
  38% {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
  opacity: 1;
}
  55% {
  -webkit-transform: translateY(-65px);
  transform: translateY(-65px);
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in;
}
  72% {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
}
  81% {
  -webkit-transform: translateY(-28px);
  transform: translateY(-28px);
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in;
}
  90% {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
}
  95% {
  -webkit-transform: translateY(-8px);
  transform: translateY(-8px);
  -webkit-animation-timing-function: ease-in;
  animation-timing-function: ease-in;
}
  100% {
  -webkit-transform: translateY(0);
  transform: translateY(0);
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
}
`;

const fadeUp = keyframes`
  0% {
    filter: alpha(opacity=0);
    opacity: .1;
    transform: translateY(100px);
  }
  100% {
    filter: alpha(opacity=100);
    opacity: 1;
    transform: translateY(0);
  }
`;

const LogoWrapper = styled.div`
  align-self: flex-start;
  visibility: hidden;
  &.active {
    visibility: visible;
    animation: ${bounceInTop} 0.75s;
  }
`;

const LandingPage = () => {
  const isDark = useRecoilValue(isDarkState);
  const [acc, setAccToken] = useRecoilState(accToken);
  const setRefToken = useSetRecoilState(refToken);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const { ref: logoRef, inView } = useInView();
  const [notifications, setNotifications] = useRecoilState(notificationsState);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    // 이벤트를 전달 받기 위해서 서버로 접속을 시작하려면 우선, 이벤트를 생성하는 서버측 스크립트를 URI로 지정하여 새로운 EventSource 객체를 생성한다
    // EventSource 생성자에 전달 된 URL이 절대 URL 인 경우 해당 출처 (scheme, domain, port)가 호출 페이지의 출처와 일치해야 한다.
    const sseEvents = new EventSource(`https://${API_URL}/v1/connect?token=${acc}`);
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
  }, [acc, isLoggedIn, setNotifications]);

  useEffect(() => {
    if (!window.location.search) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('acc') && params.get('ref')) {
      setAccToken(params.get('acc') as string);
      setRefToken(params.get('ref') as string);
      setIsLoggedIn(true);
    }
  }, [setAccToken, setIsLoggedIn, setRefToken]);

  return (
    <Layout>
      <MarqueeLogoCard />
      <LandingPageBody>
        <LogoWrapper ref={logoRef} className={inView ? 'active' : ''}>
          {isDark && <LogoDarkTheme width="100%" height="200" />}
          {isDark || <LogoLightTheme width="100%" height="200" />}
        </LogoWrapper>
        <LandingTitle />
        <IntroSection />
        <FeedSection />
        <QnASection />
        <RoadmapSection />
        <ChallengeSection />
      </LandingPageBody>
    </Layout>
  );
};
export default LandingPage;
