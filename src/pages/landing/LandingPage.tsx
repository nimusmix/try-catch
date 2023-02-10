import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import Layout from '../../layout/Layout';
import MarqueeLogoCard from './marquee-logo-wall/MarqueeLogoCard';
import LandingTitle from './landing-title/LandingTitle';
import { ReactComponent as LogoDarkTheme } from '../../assets/vertical_logo_dark_theme.svg';
import { ReactComponent as LogoLightTheme } from '../../assets/vertical_logo_light_theme.svg';
import { accToken, isDarkState, isLoggedInState, refToken } from '../../recoil';
import { QuestionPageBody } from '../qna/QnaPage';
import IntroSection from './Sections/IntroSection';
import QnASection from './Sections/QnASection';
import FeedSection from './Sections/FeedSection';
import RoadmapSection from './Sections/RoadmapSection';
import ChallengeSection from './Sections/ChallengeSection';

const LandingPageBody = styled(QuestionPageBody)`
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  align-self: flex-start;
  opacity: 0;
  transition: all 5s ease;

  &.active {
    opacity: 1;
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
