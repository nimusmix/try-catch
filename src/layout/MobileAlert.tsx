import styled, { ThemeProvider } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { ReactComponent as LogoLightTheme } from '../assets/horizontal_logo_light_theme.svg';
import { ReactComponent as LogoDarkTheme } from '../assets/horizontal_logo_dark_theme.svg';
import { SubTitle } from '../components';
import { darkTheme, lightTheme } from '../styles/theme';
import { isDarkState } from '../recoil';
import AnimationLoader from '../components/animation/AnimationLoader';
import animationData from '../assets/lottie/cat-ch-404.json';
import Navigation from './header/Navigation';

const Main = styled.main`
  position: relative;
  background-color: ${({ theme }) => theme.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
  width: 100%;
  z-index: 1;
`;

const Backdrop = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background-color: #000;
  opacity: 0.1;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const H3 = styled.h3`
  color: ${({ theme: { isDark } }) => {
    return isDark ? 'var(--colors-white-300)' : 'var(--colors-black-400)';
  }};
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const MobileAlert = () => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Navigation />
      <Main>
        <Backdrop />
        <AnimationLoader animationData={animationData} autoplay loop />
        <Header>
          {isDark && <LogoDarkTheme width="80%" height="60" />}
          {isDark || <LogoLightTheme width="80%" height="60" />}
        </Header>
        <SubTitle margin="2rem 0">죄송합니다.</SubTitle>
        <H3>
          모바일 뷰는 준비 중입니다.😥
          <br />
          트라이캐치는 데스크탑뷰에 최적화 되어있습니다.
        </H3>
        <H3>
          모바일으로는 Q&A와 피드 조회만 가능합니다.
          <br />
          불편을 드려서 죄송합니다.
        </H3>
      </Main>
    </ThemeProvider>
  );
};

export default MobileAlert;
