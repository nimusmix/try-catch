import styled from 'styled-components';
import Layout from '../../layout/Layout';
import { ProfileBio } from '../../feature';
import { Div } from '../../components';
import MyQuestionList from '../../feature/user/profile/MyQuestionList';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 3rem auto;
`;

const BadgeDiv = styled(Div)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem 4rem;
`;
const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--colors-white-100);
`;

const UserProfilePage = () => {
  return (
    <Layout>
      <ProfileWrapper>
        <ProfileBio />
        <BadgeDiv>
          <Badge>뱃지</Badge>
          <Badge>뱃지</Badge>
          <Badge>뱃지</Badge>
          <Badge>뱃지</Badge>
          <Badge>뱃지</Badge>
        </BadgeDiv>
      </ProfileWrapper>
      <MyQuestionList />
    </Layout>
  );
};

export default UserProfilePage;
