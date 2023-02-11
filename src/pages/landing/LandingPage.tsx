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
    animation: ${fadeUp} 1s;
  }
`;

const LandingPage = () => {
  const isDark = useRecoilValue(isDarkState);
  const setAccToken = useSetRecoilState(accToken);
  const setRefToken = useSetRecoilState(refToken);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const { ref: logoRef, inView } = useInView();

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
