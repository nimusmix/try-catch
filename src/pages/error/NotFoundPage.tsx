import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ReactComponent as Bug } from '../../assets/bug.svg';
import { Button, SubTitle } from '../../components';
import { darkTheme, lightTheme } from '../../styles/theme';
import { isDarkState } from '../../recoil';

const Main = styled.main`
  background-color: ${({ theme }) => theme.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
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

const H3 = styled.h3`
  color: ${({ theme: isDark }) => (isDark ? 'var(--colors-white-100)' : 'var(--colors-white-200)')};
  text-align: center;
  margin-bottom: 2rem;
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
        <Header>
          <Span>4</Span>
          <Bug width="55px" height="70px" />
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
