import { NavLink } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { ReactComponent as LogoDarkTheme } from '../../assets/horizontal_logo_dark_theme.svg';
import { ReactComponent as LogoLightTheme } from '../../assets/horizontal_logo_light_theme.svg';
import { isDarkState, isLoggedInState } from '../../recoil';
import { Header, MemberNavMenu, NavMenu, NonMemberNavMenu } from '../index';
import ThemeButton from './ThemeButton';
import { media } from '../../utils/media';
import useWindowSize from '../../hooks/useWindowSize';
import isMobileState from '../../recoil/isMobileState';

const Logo = styled.div`
  display: flex;
  width: 10rem;
  height: var(--toolbar-height);
  justify-content: center;
  align-items: center;

  & > a {
    padding-left: 2rem;
  }

  ${media.phone`
     width : auto;
     padding-left: 1rem;
     & > a {
      padding-left: 0;
     }
  `}
`;

const Nav = styled.nav`
  padding: 0 1rem;
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

const ThemeButtonWrapper = styled.div`
  margin-right: 22px;
  margin-top: 4px;
`;

const Navigation = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [width] = useWindowSize();
  const isMobile = useRecoilValue(isMobileState);

  return (
    <Header>
      <Nav>
        <NavWrapper>
          {isMobile && width < 601 && (
            <Logo>
              <NavLink to="/">
                <img
                  src={new URL(`/src/assets/favicon.ico`, import.meta.url).href}
                  alt="logo"
                  width="20"
                />
              </NavLink>
            </Logo>
          )}
          {isMobile || (
            <Logo>
              <NavLink to="/">
                {isDark && <LogoDarkTheme width="100%" height="60" />}
                {isDark || <LogoLightTheme width="100%" height="60" />}
              </NavLink>
            </Logo>
          )}
          <NavMenu />
        </NavWrapper>
        {isLoggedIn && (
          <NavWrapper>
            <MemberNavMenu />
          </NavWrapper>
        )}
        {isLoggedIn || (
          <NavWrapper>
            <ThemeButtonWrapper>
              <ThemeButton />
            </ThemeButtonWrapper>
            <NonMemberNavMenu />
          </NavWrapper>
        )}
      </Nav>
    </Header>
  );
};

export default Navigation;
