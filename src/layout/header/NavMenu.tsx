import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {
  CHALLENGES_PAGE_NAME,
  FEED_PAGE_NAME,
  QNA_PAGE_NAME,
  ROADMAP_PAGE_NAME,
} from '../../constant';
import isMobileState from '../../recoil/isMobileState';
import { media } from '../../utils/media';

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

const NavItem = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
  height: 100%;
  width: 80%;
  padding: 0.4rem;
  margin-left: 0.8rem;
  margin-right: 1rem;
  &:hover {
    color: ${({ theme }) => theme.brandColor};
    font-weight: 600;
  }
  &.active {
    color: ${({ theme }) => theme.brandColor};
    border-bottom: 2px ${({ theme }) => theme.brandColor} solid;
    font-weight: 600;
  }
`;

export const Ul = styled.ul`
  display: flex;
  height: 100%;
  margin-left: 1.5rem;

  ${media.phone`
    li:nth-child(3),li:nth-child(4){
      display: none;
    }
  `}
`;

const NavMenu = () => {
  const isMobile = useRecoilValue(isMobileState);
  return (
    <Ul>
      {/* eslint-disable-next-line array-callback-return,consistent-return */}
      {NavList.map((item) => {
        if (isMobile) {
          if (item.title === 'Q&A' || item.title === '피드') {
            return (
              <li key={item.title}>
                <NavItem to={item.link}>{item.title}</NavItem>
              </li>
            );
          }
        } else {
          return (
            <li key={item.title}>
              <NavItem to={item.link}>{item.title}</NavItem>
            </li>
          );
        }
      })}
    </Ul>
  );
};

export default NavMenu;
