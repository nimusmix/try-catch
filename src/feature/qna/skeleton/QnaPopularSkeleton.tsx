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

const QnaThumbnailImg = styled(DivBackground)`
  width: 20%;
  height: 1.5rem;
  border-radius: var(--borders-radius-base);
  transform: translate(0, -1rem);
  overflow: hidden;
`;

const QnaTitle = styled(DivBackground)`
  margin: 0 0 1rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
  min-height: 1.6rem;
  border-radius: 4px;
  animation-delay: 0.05s;
`;

const QnaContent = styled(DivBackground)`
  width: 100%;
  padding: 1rem 1rem;
  min-height: 2rem;
  border-radius: 4px;
  animation-delay: 0.06s;
`;

const CardSkeleton = styled(QnaCardSkeleton)`
  padding: 2rem;
  width: 288px;
  margin-bottom: 1rem;
  @keyframes loading {
    to {
      background-position-x: -20%;
    }
  }
`;

const QnaPopularSkeleton = () => {
  return (
    <CardSkeleton>
      <QnaThumbnailImg />
      <QnaTitle />
      <QnaContent />
    </CardSkeleton>
  );
};

export default QnaPopularSkeleton;
