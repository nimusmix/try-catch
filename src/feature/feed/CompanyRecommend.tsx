import styled from 'styled-components';
import { Button, MiniTitle, Paragraph } from '../../components';
import getImageUrl from '../../utils/getImageUrl';
import { COMPANY } from '../../constant/company';
import { FeedSearchWrapper as CompanyRecommendWrapper } from './FeedSearchSide';

interface ICompanyRecommend {
  companyNameEn: string;
  companyNameKo: string;
}

const CompanyWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.3rem 0rem;
`;

const CompanyName = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
`;

const CompanyImg = styled.img`
  width: 40px;
  height: 40px;
  padding: 0.2rem;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-brand-100)' : 'var(--colors-white-500)'};
  border-radius: var(--borders-radius-base);
  box-shadow: ${({ theme: { isDark } }) =>
    isDark
      ? 'rgba(39, 110, 226, 0.2) 0px 0px 0px 2px, rgba(39, 110, 226, 0.3) 0px 4px 6px -1px, rgba(39, 110, 226, 0.08) 0px 1px 0px inset;'
      : 'rgba(0, 0, 0, 0.16) 0px 1px 4px'};
  margin: 0 1rem 0 0.3rem;
`;

const FollowButton = styled(Button)``;

const FollowButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CompanyItem = ({ companyNameEn, companyNameKo }: ICompanyRecommend) => {
  return (
    <CompanyItemWrapper>
      <CompanyWrapper>
        <CompanyImg
          src={companyNameEn && getImageUrl(COMPANY[companyNameKo], 'logo', 'png')}
          alt={companyNameEn}
        />
        <CompanyName sizeType="sm" margin="0 0.2rem 0 0.3rem">
          {companyNameKo}
        </CompanyName>
      </CompanyWrapper>
      <FollowButtonWrapper>
        <FollowButton designType="skyFill" fontSize="var(--fonts-body-xm)">
          구독
        </FollowButton>
      </FollowButtonWrapper>
    </CompanyItemWrapper>
  );
};

const CompanyRecommend = () => {
  // 목업 추후 UseQuery로 변경
  // rank 추가해야함
  const MCompanyList = [
    {
      companyId: 1,
      companyNameEn: 'kakao',
      companyNameKo: '카카오',
    },
    {
      companyId: 2,
      companyNameEn: 'toss',
      companyNameKo: '토스',
    },
    {
      companyId: 3,
      companyNameEn: 'naver',
      companyNameKo: '네이버',
    },
    {
      companyId: 4,
      companyNameEn: 'kurly',
      companyNameKo: '마켓컬리',
    },
    {
      companyId: 5,
      companyNameEn: 'dunamu',
      companyNameKo: '두나무',
    },
  ];
  return (
    <CompanyRecommendWrapper style={{ padding: '2rem', marginTop: '1rem' }}>
      <MiniTitle
        sizeType="xl"
        margin="0 1rem 0.5rem 0.3rem"
        textAlign="left"
        style={{ fontSize: 'var(--fonts-body-base)', fontWeight: '500' }}
      >
        기업 블로그 추천
      </MiniTitle>
      <ul>
        {MCompanyList.map((companyItem) => {
          return (
            <li key={companyItem.companyId}>
              <CompanyItem
                companyNameEn={companyItem.companyNameEn}
                companyNameKo={companyItem.companyNameKo}
              />
            </li>
          );
        })}
      </ul>
    </CompanyRecommendWrapper>
  );
};

export default CompanyRecommend;
