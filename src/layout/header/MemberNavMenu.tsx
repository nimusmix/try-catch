import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import { IconBookmarkFill, IconBellFill, IconUserCircle } from '../../components/icons/Icons';
import { BOOKMARK_PAGE_NAME } from '../../constant';
import { Ul } from './NavMenu';
import { Paragraph } from '../../components';
import { accToken, isDarkState } from '../../recoil';
import { getImage, getName } from '../../apis/auth/auth';

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

const MemberNavMenu = () => {
  const isDark = useRecoilValue(isDarkState);
  const token = useRecoilValue(accToken).split('.')[1];
  const userId = JSON.parse(window.atob(token)).id;
  const { data: userName } = useQuery(['userName'], () => getName());
  const { data: profileImg } = useQuery(['profileImg'], () => getImage(userId));

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
      <Link to={`/profile/${userName}`}>
        <ProfileLi>
          {profileImg ? (
            <Img src={profileImg} />
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
      </Link>
    </Ul>
  );
};

export default MemberNavMenu;
