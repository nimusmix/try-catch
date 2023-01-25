import { BsBellFill } from 'react-icons/bs';
import { RxBookmarkFilled } from 'react-icons/rx';
import { FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { BOOKMARK_PAGE_NAME } from '../../constant';
import { Ul } from './NavMenu';
import { Paragraph } from '../../components';
import { isDarkState } from '../../recoil';

const Alert = styled.div``;

const Bookmark = styled(NavLink)``;

const Profile = styled.div`
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

const MemberNavMenu = () => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <>
      <Ul>
        <Li>
          <Alert>
            <BsBellFill
              color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
              size="20"
            />
          </Alert>
        </Li>

        <Li>
          <Bookmark to={`/${BOOKMARK_PAGE_NAME}`}>
            <RxBookmarkFilled
              color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
              size="24"
            />
          </Bookmark>
        </Li>
      </Ul>

      <Profile>
        <FaUserCircle
          color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
          size="24"
        />
        <Paragraph
          as="span"
          sizeType="base"
          color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
        >
          username
        </Paragraph>
      </Profile>
    </>
  );
};

export default MemberNavMenu;
