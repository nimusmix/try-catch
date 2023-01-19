import { NavLink } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ReactComponent as LogoDarkTheme } from '../../assets/horizontal_logo_dark_theme.svg';
import { ReactComponent as LogoLightTheme } from '../../assets/horizontal_logo_light_theme.svg';
import { HOME_PAGE_NAME } from '../../constant';
import { isDarkState, isLoggedInState } from '../../recoil';
import { Header, MemberNavMenu, NavMenu, NonMemberNavMenu } from './index';

const Logo = styled.div`
  display: flex;
  width: 10rem;
  height: var(--toolbar-height);
  justify-content: center;
  align-items: center;

  & > a {
    padding-left: 2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--toolbar-height);
  background-color: ${({ theme: { navColor } }) => navColor};
  box-shadow: ${({ theme: { boxShadowLarge } }) => boxShadowLarge};
`;

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Navigation = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <Header>
      <Nav>
        <NavWrapper>
          <Logo>
            <NavLink to={`/${HOME_PAGE_NAME}`}>
              {isDark && <LogoDarkTheme width="100%" height="60" />}
              {isDark || <LogoLightTheme width="100%" height="60" />}
            </NavLink>
          </Logo>
          <NavMenu />
          <button
            type="button"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsDark((prev: boolean) => !prev)}
          >
            임시 테마버튼
          </button>
        </NavWrapper>
        {isLoggedIn && (
          <NavWrapper>
            <MemberNavMenu />
          </NavWrapper>
        )}
        {isLoggedIn || (
          <NavWrapper>
            <NonMemberNavMenu />
          </NavWrapper>
        )}
      </Nav>
    </Header>
  );
};

export default Navigation;
