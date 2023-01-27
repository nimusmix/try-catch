import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { TopButton } from '../../components';
import Layout from '../../layout/Layout';
import TagList from './tags-loop-slider/TagList';
import MarqueeLogoCard from './marquee-logo-wall/MarqueeLogoCard';
import LandingTitle from './landing-title/LandingTitle';
import { ReactComponent as LogoDarkTheme } from '../../assets/vertical_logo_dark_theme.svg';
import { ReactComponent as LogoLightTheme } from '../../assets/vertical_logo_light_theme.svg';
import { isDarkState } from '../../recoil';
import { QuestionPageBody } from '../qna/QnaPage';

const LandingPageBody = styled(QuestionPageBody)`
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  align-self: flex-start;
`;
const LandingPage = () => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <Layout>
      <MarqueeLogoCard />
      <LandingPageBody>
        <LogoWrapper>
          {isDark && <LogoDarkTheme width="100%" height="150" />}
          {isDark || <LogoLightTheme width="100%" height="150" />}
        </LogoWrapper>
        <LandingTitle />
        <TagList />
      </LandingPageBody>
      <TopButton />
    </Layout>
  );
};
export default LandingPage;
