import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCompanyDetail, getCompanyId } from '../../../apis/profile/companyProfile';
import { MiniTitle, Paragraph } from '../../../components';
import { ICompany } from '../../../interface/user';

const BioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    margin: 0.375rem 0;
  }
`;

const ProfileImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: var(--borders-radius-round);
  box-shadow: var(--shadows-black-lg);
  margin-bottom: 20px;
`;

const SubscriptionWrapper = styled.div`
  display: flex;
  margin: 0.25rem 0;

  & :first-child {
    margin-right: 0.5rem;
  }
`;

const UrlText = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
  margin: 0.25rem 0;
`;

const CompanyProfileBio = () => {
  const { companyName } = useParams();
  const { data: id } = useQuery<number>(['companyId'], () => getCompanyId(companyName!));
  const { data: company } = useQuery<ICompany>(['companyDetail'], () => getCompanyDetail(id!), {
    enabled: !!id,
  });

  return (
    <BioWrapper>
      <InfoWrapper>
        <ProfileImg src={company?.companyLogo} />
        <MiniTitle sizeType="3xl">{company?.companyName}</MiniTitle>
        <SubscriptionWrapper>
          <Paragraph sizeType="lg">구독</Paragraph>
          <Paragraph sizeType="lg" fontWeight="600">
            {company?.subscriptionCount}
          </Paragraph>
        </SubscriptionWrapper>
        <UrlText sizeType="sm">{company?.companyBlog}</UrlText>
      </InfoWrapper>
    </BioWrapper>
  );
};

export default CompanyProfileBio;
