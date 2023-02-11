import { NavLink } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ReactComponent as LogoDarkTheme } from '../../assets/horizontal_logo_dark_theme.svg';
import { ReactComponent as LogoLightTheme } from '../../assets/horizontal_logo_light_theme.svg';
import { isDarkState, isLoggedInState, isSystemThemeState } from '../../recoil';
import { Header, MemberNavMenu, NavMenu, NonMemberNavMenu } from '../index';

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
  padding-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--toolbar-height);
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

  /** 테마: 시스템 설정 */
  const [isSystemTheme, setSystemTheme] = useRecoilState(isSystemThemeState);
  const mql = window.matchMedia('(prefers-color-scheme: dark)');

  const ChangeEventTheme = (e: any) => {
    if (!isSystemTheme) {
      // 아무것도 안함
    } else if (e.matches) {
      // 해당 미디어 쿼리가 참인 경우 (다크모드)
      setIsDark(true);
    } else {
      // 해당 미디어 쿼리가 거짓인 경우
      setIsDark(false);
    }
  };
  mql.addEventListener('change', ChangeEventTheme, { once: true });

  return (
    <Header>
      <Nav>
        <NavWrapper>
          <Logo>
            <NavLink to="/">
              {isDark && <LogoDarkTheme width="100%" height="60" />}
              {isDark || <LogoLightTheme width="100%" height="60" />}
            </NavLink>
          </Logo>
          <NavMenu />
          {/* 임시 버튼 */}
          <button
            type="button"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              return setIsDark((prev: boolean) => !prev);
            }}
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
