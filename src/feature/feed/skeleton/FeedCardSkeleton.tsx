import styled from 'styled-components';
import { Card } from '../../../components';

const DivBackground = styled.div`
  background-color: #ededed;
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    #ededed;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
`;

const FeedThumbnailImg = styled(DivBackground)`
  width: 122%;
  height: 10.625rem;
  border-radius: var(--borders-radius-base);
  transform: translate(-1.5rem, -1rem);
  overflow: hidden;
`;

const FeedTitle = styled(DivBackground)`
  margin: 0 0 1rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
  min-height: 1.6rem;
  border-radius: 4px;
  animation-delay: 0.05s;
`;

const FeedContent = styled(DivBackground)`
  padding: 2rem 1.8rem;
  min-height: 4rem;
  border-radius: 4px;
  animation-delay: 0.06s;
`;

const CardSkeleton = styled(Card)`
  @keyframes loading {
    to {
      background-position-x: -20%;
    }
  }
`;

const FeedCardSkeleton = () => {
  return (
    <CardSkeleton width="32%" style={{ margin: '0.5rem 0rem 1rem 0.7rem', padding: '1rem 1.5rem' }}>
      <FeedThumbnailImg />
      <FeedTitle />
      <FeedContent />
    </CardSkeleton>
  );
};

export default FeedCardSkeleton;
