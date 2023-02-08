import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Layout from '../../layout/Layout';
import { ProfileBio } from '../../feature';
import { Div } from '../../components';
import MyProfileMenu from '../../feature/user/profile/MyProfileMenu';
import AnswerList from '../../feature/user/profile/AnswerList';

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
  const [activeMenu, setActiveMenu] = useState('질문');
  const [isMine, setIsMine] = useState('false');

  return (
    <Layout>
      <ProfileWrapper>
        <ProfileBio changeFn={setIsMine} />
        <BadgeDiv>
          <Badge>뱃지</Badge>
          <Badge>뱃지</Badge>
          <Badge>뱃지</Badge>
          <Badge>뱃지</Badge>
          <Badge>뱃지</Badge>
        </BadgeDiv>
      </ProfileWrapper>
      {/* {isMine ? <MyProfileMenu /> : null} */}
      <MyProfileMenu />
    </Layout>
  );
};

export default UserProfilePage;
