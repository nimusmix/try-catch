import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { IconUserCircle } from '../../components/icons/Icons';
import { isDarkState } from '../../recoil';

const NonUserWrapper = styled.a`
  padding-right: 2rem;
`;

const NonMemberNavMenu = () => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <>
      {/* <Button designType="blueEmpty">회원가입</Button>
            <Button>로그인</Button> */}
      <NonUserWrapper href="https://api.try-catch.duckdns.org/login/oauth2/authorization/github">
        <IconUserCircle
          color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
          size="24"
        />
      </NonUserWrapper>
    </>
  );
};

export default NonMemberNavMenu;
