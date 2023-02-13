import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import Layout from '../../layout/Layout';
import CompanyProfileBio from '../../feature/user/profile/CompanyProfileBio';
import { ICompany } from '../../interface/user';
import { getCompanyId, getCompanyDetail } from '../../apis/profile/companyProfile';
import CompanyFeedList from '../../feature/user/profile/CompanyFeedList';

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: 3rem auto;
`;

const CompanyProfilePage = () => {
  const { companyName } = useParams();
  const { data: id } = useQuery<number>(['companyId', companyName], () =>
    getCompanyId(companyName!)
  );
  const { data: company } = useQuery<ICompany>(['companyDetail', id], () => getCompanyDetail(id!), {
    enabled: !!id,
  });

  return (
    <Layout>
      <ProfileWrapper>
        <CompanyProfileBio {...company} />
        <CompanyFeedList {...company} />
      </ProfileWrapper>
    </Layout>
  );
};

export default CompanyProfilePage;
