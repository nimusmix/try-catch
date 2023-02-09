import styled from 'styled-components';
import { Button, MiniTitle, Paragraph } from '../../../components';
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
  border-bottom: 1px solid ${({ theme }) => theme.textColor100};
`;

const CompanyProfileBio = ({
  companyLogo,
  companyName,
  subscriptionCount,
  isSubscribe,
  companyBlog,
}: Partial<ICompany>) => {
  return (
    <BioWrapper>
      <InfoWrapper>
        <ProfileImg src={companyLogo} />
        <MiniTitle sizeType="3xl">{companyName}</MiniTitle>
        <SubscriptionWrapper>
          <Paragraph sizeType="lg">구독</Paragraph>
          <Paragraph sizeType="lg" fontWeight="600">
            {subscriptionCount}
          </Paragraph>
        </SubscriptionWrapper>
        <UrlText sizeType="sm" as="a" href={companyBlog}>
          {companyBlog}
        </UrlText>
      </InfoWrapper>
      <Button
        designType={isSubscribe ? 'blueFill' : 'blueEmpty'}
        padding="0.25rem 1rem"
        borderRadius="var(--borders-radius-lg)"
      >
        {isSubscribe ? '구독중' : '구독'}
      </Button>
    </BioWrapper>
  );
};

export default CompanyProfileBio;
