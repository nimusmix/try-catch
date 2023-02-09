import styled from 'styled-components';
import { ICompany } from '../../../interface/user';
import CompanyFeedListItem from './CompanyFeedListItem';

const FeedListWrapper = styled.div`
  margin-top: 2.5rem;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const CompanyFeedList = ({ companyFeed }: Partial<ICompany>) => {
  return (
    <FeedListWrapper>
      {companyFeed?.map((feed) => {
        return <CompanyFeedListItem {...feed} key={feed.feedId} />;
      })}
    </FeedListWrapper>
  );
};

export default CompanyFeedList;
