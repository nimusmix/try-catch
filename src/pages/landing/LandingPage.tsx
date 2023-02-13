import styled, { keyframes } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
  // !!! 토큰 고침 !!!
  // const setAccToken = useSetRecoilState(accToken);
  // const setRefToken = useSetRecoilState(refToken);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const { ref: logoRef, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!window.location.search) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('acc') && params.get('ref')) {
      // !!! 토큰 고침 !!!
      // setAccToken(params.get('acc') as string);
      // setRefToken(params.get('ref') as string);
      setIsLoggedIn(true);
      localStorage.setItem('accToken', params.get('acc') as string);
      localStorage.setItem('refToken', params.get('ref') as string);
    }
  }, [setIsLoggedIn]);

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
