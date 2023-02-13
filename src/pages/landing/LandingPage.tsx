import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import Layout from '../../layout/Layout';
import MarqueeLogoCard from '../../feature/landing/marquee-logo-wall/MarqueeLogoCard';
import LandingTitle from '../../feature/landing/landing-title/LandingTitle';
import { ReactComponent as LogoDarkTheme } from '../../assets/vertical_logo_dark_theme.svg';
import { ReactComponent as LogoLightTheme } from '../../assets/vertical_logo_light_theme.svg';
import { isDarkState, isLoggedInState } from '../../recoil';
import { QuestionPageBody } from '../qna/QnaPage';
import IntroSection from '../../feature/landing/Sections/IntroSection';
import QnASection from '../../feature/landing/Sections/QnASection';
import FeedSection from '../../feature/landing/Sections/FeedSection';
import RoadmapSection from '../../feature/landing/Sections/RoadmapSection';
import ChallengeSection from '../../feature/landing/Sections/ChallengeSection';
import SEOMetaTag from '../../components/seo/SEOMetaTag';
import { SITE_URL } from '../../constant';

const LandingPageBody = styled(QuestionPageBody)`
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  align-self: flex-start;
`;

const LandingPage = () => {
  const isDark = useRecoilValue(isDarkState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  useEffect(() => {
    if (!window.location.search) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('acc') && params.get('ref')) {
      localStorage.setItem('accToken', params.get('acc') as string);
      localStorage.setItem('refToken', params.get('ref') as string);
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  return (
    <Layout>
      <SEOMetaTag
        title="트라이캐치"
        description="함께 지식과 경험을 공유하며 좋은 개발자로 성장해요!"
        keywords="개발자,SNS,깃허브,질문,스택오버플로우,블로그,기술블로그,챌린지,웹,개발"
        img={new URL(`/src/assets/thumbnail.png`, import.meta.url).href}
        siteUrl={SITE_URL}
      />
      <MarqueeLogoCard />
      <LandingPageBody>
        <LogoWrapper>
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
