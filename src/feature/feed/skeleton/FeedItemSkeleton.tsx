import styled from 'styled-components';
import { Card } from '../../../components';
import { DivBackground } from './FeedCardSkeleton';

const FeedThumbnailImg = styled(DivBackground)`
  width: 12rem;
  height: 8rem;

  border-radius: var(--borders-radius-base);
  margin: 0.5rem 1.5rem 0.5rem 0rem;
`;

const FeedTitle = styled(DivBackground)`
  width: 50%;
  height: 2rem;
  border-radius: var(--borders-radius-base);
  margin: 0.6rem 0 0.5rem;
`;

const FeedContent = styled(DivBackground)`
  width: 100%;
  height: 1.5rem;
  border-radius: var(--borders-radius-base);
  margin: 0.6rem 0 0.5rem;
`;

const FeedBody = styled.div`
  width: 70%;
`;

const ListSkeleton = styled(Card)`
  padding: 1rem 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  @keyframes loading {
    to {
      background-position-x: -20%;
    }
  }
`;

const Skeleton = () => {
  return (
    <ListSkeleton>
      <FeedThumbnailImg />
      <FeedBody>
        <FeedTitle />
        <FeedContent />
        <FeedContent />
      </FeedBody>
    </ListSkeleton>
  );
};

export default Skeleton;
