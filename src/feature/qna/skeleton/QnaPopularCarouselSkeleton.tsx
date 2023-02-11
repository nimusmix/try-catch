import styled from 'styled-components';
import { QnaCardSkeleton } from './QnaListSkeleton';

const DivBackground = styled.div`
  background-color: ${({ theme: { isDark } }) => (isDark ? 'var(--colors-black-200)' : '#ededed')};
  background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    )
    ${({ theme: { isDark } }) => (isDark ? 'var(--colors-black-200)' : '#ededed')};
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
`;

const QnaContent = styled(DivBackground)`
  width: 90%;
  margin: auto;
  padding: 1rem 2rem;
  min-height: 7.5rem;
  border-radius: 8px;
  animation-delay: 0.05s;
`;

const CardSkeleton = styled(QnaCardSkeleton)`
  border-bottom: none;
  padding: 0 2rem 1rem 2rem;
  width: 290px;
  height: 100%;
  @keyframes loading {
    to {
      background-position-x: -20%;
    }
  }
`;

const QnaPopularCarouselSkeleton = () => {
  return (
    <CardSkeleton>
      <QnaContent />
    </CardSkeleton>
  );
};

export default QnaPopularCarouselSkeleton;
