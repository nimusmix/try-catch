import { useQuery } from 'react-query';
import { Button, MiniTitle, Paragraph } from '../../components';
import { FeedSearchWrapper as CompanyRecommendWrapper } from './feed-search/FeedSearchSide';
import { IFeedCompany } from '../../interface/feed';
import { getFeedCompany } from '../../apis/feed/feed';
import CompanyRecommendItem from './CompanyRecommendItem';

const CompanyRecommend = () => {
  // 목업 추후 UseQuery로 변경
  // rank 추가해야함
  const MCompanyList = [
    {
      companyId: 11,
      logoSrc: 'https://www.skcc.co.kr/v2/img/kr/layout/favicon.ico',
      companyName: 'SKCNC',
      isFollowed: false,
    },
    {
      companyId: 46,
      logoSrc: 'https://raw.githubusercontent.com/trycatch-ssafy/logo/main/line.png',
      companyName: '라인',
      isFollowed: true,
    },
    {
      companyId: 33,
      logoSrc: 'https://devocean.sk.com/resource/images/external/logo/logo_favicon.ico',
      companyName: '데보션',
      isFollowed: false,
    },
    {
      companyId: 119,
      logoSrc: 'https://raw.githubusercontent.com/trycatch-ssafy/logo/main/cntech-systems.png',
      companyName: '씨앤텍시스템즈',
      isFollowed: false,
    },
    {
      companyId: 183,
      logoSrc: 'https://raw.githubusercontent.com/trycatch-ssafy/logo/main/kakao.png',
      companyName: '카카오',
      isFollowed: false,
    },
  ];

  const { data: companyRecommendList } = useQuery<Array<IFeedCompany>>(
    ['companyRecommendList'] as const,
    getFeedCompany
  );

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
        {companyRecommendList &&
          companyRecommendList.map((companyItem) => {
            return (
              <li key={companyItem.companyId}>
                <CompanyRecommendItem {...companyItem} />
              </li>
            );
          })}
      </ul>
    </CompanyRecommendWrapper>
  );
};

export default CompanyRecommend;
