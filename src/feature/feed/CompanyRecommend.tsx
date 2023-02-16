import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Button, MiniTitle, Paragraph } from '../../components';
import { FeedSearchWrapper } from './feed-search/FeedSearchSide';
import { IFeedCompany } from '../../interface/feed';
import { getFeedCompany } from '../../apis/feed/feed';
import CompanyRecommendItem from './CompanyRecommendItem';
import { media } from '../../utils/media';

const CompanyRecommendWrapper = styled(FeedSearchWrapper)`
  padding: 2rem;
  margin-top: 1rem;
  ${media.phone`
      display: none;
    `}
`;

const CompanyRecommend = () => {
  const { data: companyRecommendList } = useQuery<Array<IFeedCompany>>(
    ['companyRecommendList'] as const,
    getFeedCompany
  );

  return (
    <CompanyRecommendWrapper>
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
