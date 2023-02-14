import styled from 'styled-components';
import FeedCardSkeleton from './FeedCardSkeleton';

export const FeedListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 52.875rem;
`;

const FeedCardSkeletonList = () => {
  return (
    <FeedListWrapper>
      <FeedCardSkeleton />
      <FeedCardSkeleton />
      <FeedCardSkeleton />
      <FeedCardSkeleton />
      <FeedCardSkeleton />
      <FeedCardSkeleton />
    </FeedListWrapper>
  );
};

export default FeedCardSkeletonList;
