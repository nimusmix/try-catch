import { useQuery } from 'react-query';
import { Button, MiniTitle, Paragraph } from '../../components';
import { FeedSearchWrapper as CompanyRecommendWrapper } from './feed-search/FeedSearchSide';
import { IFeedCompany } from '../../interface/feed';
import { getFeedCompany } from '../../apis/feed/feed';
import CompanyRecommendItem from './CompanyRecommendItem';

const CompanyRecommend = () => {
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
