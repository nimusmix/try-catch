import styled, { css } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import { IconBellFill, IconBookmarkFill, IconUserCircle } from '../../components/icons/Icons';
import { BOOKMARK_PAGE_NAME } from '../../constant';
import { Ul } from './NavMenu';
import { Paragraph } from '../../components';
import { accToken, isDarkState } from '../../recoil';
import { getImage, getName } from '../../apis/auth/auth';
import useDetectClose from '../../hooks/useDetectClose';

const Alert = styled.div``;

const Bookmark = styled(NavLink)``;

const ProfileLi = styled.li`
  display: flex;
  align-items: center;
  padding-right: 2rem;
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
    width: 100%;
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

const DropdownContainer = styled.div`
  position: relative;
`;

const Menu = styled.div<{ isDropped: any }>`
  position: absolute;
  background-color: gray;
  top: 52px;
  left: 50%;
  width: 100px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: gray;
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const MemberNavMenu = () => {
  const isDark = useRecoilValue(isDarkState);
  const acc = useRecoilValue(accToken);
  const { data: profileImage } = useQuery(['user', 'profileImage'] as const, () => getImage(acc));
  const { data: userName } = useQuery(['user', 'userName'] as const, getName, {
    enabled: !!profileImage,
  });

  const [dropdownIsOpen, dropdownRef, dropdownHandler] = useDetectClose(false);

  return (
    <Ul>
      <Li>
        <Alert>
          <IconBellFill
            color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
            size="20"
          />
        </Alert>
      </Li>

      <Li>
        <Bookmark to={`/${BOOKMARK_PAGE_NAME}`}>
          <IconBookmarkFill
            color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
            size="24"
          />
        </Bookmark>
      </Li>
      {/* <Link to={`/profile/${userName}`}> */}
      <DropdownContainer>
        <ProfileLi as="button" onClick={() => dropdownHandler} ref={() => dropdownRef}>
          {profileImage ? (
            <Img src={profileImage} />
          ) : (
            <IconUserCircle
              color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
              size="24"
            />
          )}
          <Paragraph
            as="span"
            sizeType="base"
            color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
          >
            {userName}
          </Paragraph>
        </ProfileLi>
        <Menu isDropped={dropdownIsOpen}>
          <Ul>
            <Li>마이페이지</Li>
            <Li>설정</Li>
            <Li>로그아웃</Li>
          </Ul>
        </Menu>
      </DropdownContainer>
      {/* </Link> */}
    </Ul>
  );
};

export default MemberNavMenu;
