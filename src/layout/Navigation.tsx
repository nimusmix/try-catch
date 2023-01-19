import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import LogoDarkTheme from '../assets/horizontal_logo_dark_theme.svg';
import LogoLightTheme from '../assets/horizontal_logo_light_theme.svg';
import {
  HOME_PAGE_NAME,
  QNA_PAGE_NAME,
  FEED_PAGE_NAME,
  ROADMAP_PAGE_NAME,
  CHALLENGES_PAGE_NAME,
  BOOKMARK_PAGE_NAME,
  PROFILE_PAGE_NAME,
  SETTINGS_PAGE_NAME,
} from '../constant';
import { Button } from '../components';
import { isDarkState, isLoggedInState } from '../recoil';
import Header from './Header';

const Logo = styled.img`
  width: 124px;
  margin-right: 1.4rem;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0rem 2rem;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: var(--shadows-black);
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  height: 100%;
  padding: 0.4rem;
  margin-left: 0.8rem;
  margin-right: 1rem;
  &:hover {
    color: ${({ theme }) => theme.brandColor};
  }
  &.active {
    color: ${({ theme }) => theme.brandColor};
    border-bottom: 2px ${({ theme }) => theme.brandColor} solid;
    // font-weight 추가하기!!
  }
`;

const NavList = [
  {
    link: `/${QNA_PAGE_NAME}`,
    title: 'Q&A',
  },
  {
    link: `/${FEED_PAGE_NAME}`,
    title: '피드',
  },
  {
    link: `/${ROADMAP_PAGE_NAME}`,
    title: '로드맵',
  },
  {
    link: `/${CHALLENGES_PAGE_NAME}`,
    title: '챌린지',
  },
];

const Alert = styled.div`
  margin-right: 0.8rem;
`;
const Bookmark = styled(NavLink)`
  margin-right: 0.8rem;
  padding-bottom: 0.6px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 6px;
  }
  p {
    padding-bottom: 1.4px;
  }
`;

const Navigation = () => {
  const isDark = useRecoilValue(isDarkState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  return (
    <Header>
      <Nav>
        <NavWrapper>
          <NavLink to={`/${HOME_PAGE_NAME}`}>
            <Logo src={isDark ? LogoDarkTheme : LogoLightTheme} alt="logo" />
          </NavLink>
          {NavList.map((item) => (
            <NavItem key={item.title} to={item.link}>
              {item.title}
            </NavItem>
          ))}
        </NavWrapper>
        {isLoggedIn ? (
          <NavWrapper>
            <Alert>
              <svg
                width="15"
                height="17"
                viewBox="0 0 15 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.50002 16.582C8.68261 16.582 9.64187 15.6965 9.64187 14.604H5.35817C5.35817 15.6965 6.31743 16.582 7.50002 16.582ZM14.7117 11.955C14.0649 11.3133 12.8545 10.3481 12.8545 7.18638C12.8545 4.78494 11.0304 2.86255 8.57078 2.39092V1.74682C8.57078 1.2007 8.09132 0.757812 7.50002 0.757812C6.90873 0.757812 6.42926 1.2007 6.42926 1.74682V2.39092C3.96966 2.86255 2.14556 4.78494 2.14556 7.18638C2.14556 10.3481 0.935179 11.3133 0.288304 11.955C0.0874115 12.1543 -0.00165096 12.3926 2.31492e-05 12.6259C0.00370618 13.1328 0.434621 13.615 1.0748 13.615H13.9252C14.5654 13.615 14.9967 13.1328 15 12.6259C15.0017 12.3926 14.9126 12.154 14.7117 11.955Z"
                  fill={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
                />
              </svg>
            </Alert>

            <Bookmark to={`/${HOME_PAGE_NAME}`}>
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.99934 18.593C4.85619 18.5925 4.71556 18.5556 4.59101 18.4858C4.46229 18.4143 4.3551 18.3102 4.28043 18.1842C4.20575 18.0582 4.16626 17.9148 4.16601 17.7688V5.67814C4.15475 5.1839 4.34087 4.70517 4.68404 4.34572C5.02721 3.98626 5.49978 3.77503 5.99934 3.75781H13.9993C14.4989 3.77503 14.9715 3.98626 15.3146 4.34572C15.6578 4.70517 15.8439 5.1839 15.8327 5.67814V17.7688C15.8318 17.9126 15.7929 18.0537 15.7198 18.1781C15.6467 18.3024 15.542 18.4057 15.416 18.4776C15.2893 18.5499 15.1456 18.588 14.9993 18.588C14.8531 18.588 14.7094 18.5499 14.5827 18.4776L9.85768 15.832L5.41601 18.4694C5.29064 18.5463 5.14685 18.589 4.99934 18.593Z"
                  fill={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
                />
              </svg>
            </Bookmark>

            <Profile>
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.1578 9.32531C10.6601 9.32531 11.1512 9.17799 11.5688 8.902C11.9865 8.626 12.312 8.23371 12.5042 7.77475C12.6964 7.31578 12.7467 6.81075 12.6487 6.32351C12.5507 5.83627 12.3089 5.38872 11.9537 5.03744C11.5985 4.68616 11.146 4.44694 10.6533 4.35002C10.1607 4.2531 9.65002 4.30285 9.18595 4.49296C8.72189 4.68307 8.32524 5.00501 8.04618 5.41807C7.76711 5.83112 7.61816 6.31675 7.61816 6.81353C7.61816 7.4797 7.88574 8.11858 8.36202 8.58962C8.8383 9.06067 9.48428 9.32531 10.1578 9.32531Z"
                  fill={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
                />
                <path
                  d="M13.9669 15.6046C14.1352 15.6046 14.2967 15.5384 14.4158 15.4207C14.5349 15.3029 14.6018 15.1432 14.6018 14.9767C14.6018 13.8109 14.1335 12.6928 13.3 11.8685C12.4665 11.0442 11.3361 10.5811 10.1573 10.5811C8.97859 10.5811 7.84813 11.0442 7.01464 11.8685C6.18114 12.6928 5.71289 13.8109 5.71289 14.9767C5.71289 15.1432 5.77978 15.3029 5.89885 15.4207C6.01793 15.5384 6.17942 15.6046 6.34781 15.6046H13.9669Z"
                  fill={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
                />
                <path
                  d="M19.6 10.6596C19.6 15.8967 15.3061 20.1498 10 20.1498C4.69389 20.1498 0.4 15.8967 0.4 10.6596C0.4 5.42255 4.69389 1.16953 10 1.16953C15.3061 1.16953 19.6 5.42255 19.6 10.6596Z"
                  stroke={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
                  strokeWidth="1"
                />
              </svg>
              <p>username</p>
            </Profile>
          </NavWrapper>
        ) : (
          <NavWrapper>
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1578 9.32531C10.6601 9.32531 11.1512 9.17799 11.5688 8.902C11.9865 8.626 12.312 8.23371 12.5042 7.77475C12.6964 7.31578 12.7467 6.81075 12.6487 6.32351C12.5507 5.83627 12.3089 5.38872 11.9537 5.03744C11.5985 4.68616 11.146 4.44694 10.6533 4.35002C10.1607 4.2531 9.65002 4.30285 9.18595 4.49296C8.72189 4.68307 8.32524 5.00501 8.04618 5.41807C7.76711 5.83112 7.61816 6.31675 7.61816 6.81353C7.61816 7.4797 7.88574 8.11858 8.36202 8.58962C8.8383 9.06067 9.48428 9.32531 10.1578 9.32531Z"
                fill={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
              />
              <path
                d="M13.9669 15.6046C14.1352 15.6046 14.2967 15.5384 14.4158 15.4207C14.5349 15.3029 14.6018 15.1432 14.6018 14.9767C14.6018 13.8109 14.1335 12.6928 13.3 11.8685C12.4665 11.0442 11.3361 10.5811 10.1573 10.5811C8.97859 10.5811 7.84813 11.0442 7.01464 11.8685C6.18114 12.6928 5.71289 13.8109 5.71289 14.9767C5.71289 15.1432 5.77978 15.3029 5.89885 15.4207C6.01793 15.5384 6.17942 15.6046 6.34781 15.6046H13.9669Z"
                fill={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
              />
              <path
                d="M19.6 10.6596C19.6 15.8967 15.3061 20.1498 10 20.1498C4.69389 20.1498 0.4 15.8967 0.4 10.6596C0.4 5.42255 4.69389 1.16953 10 1.16953C15.3061 1.16953 19.6 5.42255 19.6 10.6596Z"
                stroke={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
                strokeWidth="1"
              />
            </svg>
            {/* <Button designType="blueEmpty">회원가입</Button>
            <Button>로그인</Button> */}
          </NavWrapper>
        )}
      </Nav>
    </Header>
  );
};

export default Navigation;
