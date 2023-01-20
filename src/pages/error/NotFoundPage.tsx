import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Player } from '@lottiefiles/react-lottie-player';
import { ReactComponent as Bug } from '../../assets/bug.svg';
import { Button, SubTitle } from '../../components';
import { darkTheme, lightTheme } from '../../styles/theme';
import { isDarkState } from '../../recoil';

const Main = styled.main`
  position: relative;
  background-color: ${({ theme }) => theme.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
  z-index: 1;
  text-shadow: ${({ theme: { isDark } }) => {
    return isDark ? 'var(--colors-brand-500) 1px 0 10px' : 'var(--colors-black-100) 1px 0 10px';
  }};
`;

const Span = styled.span`
  font-size: 64px;
  font-weight: 800;
  color: ${({ theme }) => theme.textColor};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Back = styled.div`
  position: absolute;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-brand-500)' : 'var(--colors-black-300)'};
  filter: blur(2rem);
  width: 40px;
  height: 60px;
`;

const H3 = styled.h3`
  color: ${({ theme: { isDark } }) => {
    return isDark ? 'var(--colors-white-300)' : 'var(--colors-black-400)';
  }};
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const ButtonWrapper = styled.div`
  display: flex;

  & > button:first-child {
    margin-right: 1rem;
  }
`;
const NotFound = () => {
  const navigate = useNavigate();
  const isDark = useRecoilValue(isDarkState);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Main>
        <Player
          src="src/assets/cat-ch-404.json"
          className="player"
          loop
          autoplay
          style={{
            opacity: 0.4,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        />
        <Header>
          <Span>4</Span>
          <Bug width="55px" height="70px" />
          <Back />
          <Span>4</Span>
        </Header>
        <SubTitle margin="2rem 0">요청하신 페이지를 찾을 수 없습니다.</SubTitle>
        <H3>
          주소가 잘못 입력되었거나, 변경 또는 삭제되어
          <br /> 페이지를 불러올 수 없습니다.
        </H3>

        <ButtonWrapper>
          <Button designType="blueEmpty" onClick={() => navigate(-1)}>
            이전 페이지
          </Button>
          <Button onClick={() => navigate('/')}>홈으로 이동</Button>
        </ButtonWrapper>
      </Main>
    </ThemeProvider>
  );
};

export default NotFound;
