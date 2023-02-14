import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Layout from '../../layout/Layout';
import { ProfileBio } from '../../feature';
import { Div } from '../../components';
import MyProfileMenu from '../../feature/user/profile/MyProfileMenu';
import AnotherProfileMenu from '../../feature/user/profile/AnotherProfileMenu';
import { getName } from '../../apis/auth/auth';
import isMyself from '../../utils/isMyself';
import BadgeList from '../../feature/user/profile/BadgeList';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 3rem auto;
`;

const UserProfilePage = () => {
  const { userName } = useParams();
  const { data: loginedUserName } = useQuery(
    ['loginedUserName', 'profileBio', userName] as const,
    getName
  );
  const isMine = isMyself(loginedUserName, userName!);

  return (
    <Layout>
      <ProfileWrapper>
        <ProfileBio />
        <BadgeList />
      </ProfileWrapper>
      {isMine && <MyProfileMenu />}
      {isMine || <AnotherProfileMenu />}
    </Layout>
  );
};

export default UserProfilePage;
