import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import React from 'react';
import { IconBookmarkFill, IconUserCircle } from '../../components/icons/Icons';
import { BOOKMARK_PAGE_NAME } from '../../constant';
import { Paragraph } from '../../components';
import { accToken, isDarkState, isLoggedInState, refToken } from '../../recoil';
import { getImage, getName } from '../../apis/auth/auth';
import { Ul } from './NavMenu';
import NoticeBell from './NoticeBell';

const Bookmark = styled(NavLink)``;

const ProfileLi = styled.li`
  display: flex;
  align-items: center;
  height: var(--toolbar-height);
  cursor: pointer;
  svg {
    margin-right: 0.6rem;
  }
`;

const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  margin-right: 0.8rem;

  & > * {
    height: var(--toolbar-height);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

const ProfileWrapper = styled.span`
  display: flex;
`;

export const DropLi = styled.li`
  list-style: none;
  color: ${({ theme }) => theme.textColor100};
`;

export const DropUl = styled.ul`
  list-style: none;
  line-height: 1.75rem;
`;

export const Dropdown = styled.button`
  border: none;
  outline: none;
  position: relative;

  #deleteAlert {
    background-color: red;
  }
`;

export const DropLiContainer = styled.div`
  min-width: 120px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: var(--borders-radius-base);
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 4px;
  padding: 1rem;
  position: absolute;
  display: none;

  ${Dropdown}:focus & {
    display: block;
  }
`;

const Line = styled.div`
  margin: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  width: 100%;
`;

const MemberNavMenu = () => {
  const isDark = useRecoilValue(isDarkState);
  const acc = useRecoilValue(accToken);
  const { data: profileImage } = useQuery(['user', 'profileImage'] as const, () => getImage(acc));
  const { data: userName } = useQuery(['user', 'userName'] as const, getName, {
    enabled: !!profileImage,
  });

  const navi = useNavigate();

  const goToProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    navi(`/profile/${userName}`);
  };

  const goToSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    navi('/settings');
  };

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setAccToken = useSetRecoilState(accToken);
  const setRefToken = useSetRecoilState(refToken);
  const logout = (e: React.MouseEvent) => {
    console.log('로그아웃 누름');
    e.preventDefault();
    setIsLoggedIn(false);
    setAccToken('');
    setRefToken('');
    navi('/');
  };

  return (
    <Ul>
      <Li>
        <NoticeBell />
      </Li>

      <Li>
        <Bookmark to={`/${BOOKMARK_PAGE_NAME}`}>
          <IconBookmarkFill
            color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
            size="24"
          />
        </Bookmark>
      </Li>
      <ProfileLi>
        <Dropdown>
          <ProfileWrapper>
            {profileImage ? (
              <Img src={profileImage} />
            ) : (
              <span>
                <IconUserCircle
                  color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
                  size="24"
                />
              </span>
            )}
            <Paragraph
              as="span"
              sizeType="base"
              color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
            >
              {userName}
            </Paragraph>
          </ProfileWrapper>
          <DropLiContainer>
            <DropUl>
              <DropLi as="div" onClick={goToProfile}>
                내 프로필
              </DropLi>
              {/* <DropLi as={Link} to="/settings"> */}
              <DropLi as="div" onClick={goToSettings}>
                설정
              </DropLi>
              <Line />
              <DropLi as="div" onClick={logout}>
                로그아웃
              </DropLi>
            </DropUl>
          </DropLiContainer>
        </Dropdown>
      </ProfileLi>
    </Ul>
  );
};

export default MemberNavMenu;
