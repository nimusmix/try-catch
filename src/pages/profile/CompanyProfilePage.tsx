import styled from 'styled-components';
import Layout from '../../layout/Layout';
import CompanyProfileBio from '../../feature/user/profile/CompanyProfileBio';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 3rem auto;
`;

const CompanyProfilePage = () => {
  return (
    <Layout>
      <ProfileWrapper>
        <CompanyProfileBio />
      </ProfileWrapper>
    </Layout>
  );
};

export default CompanyProfilePage;
