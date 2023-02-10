import styled from 'styled-components';
import { Card } from '../../../components';

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

const QnaTitle = styled(DivBackground)`
  margin: 0 0 1rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
  min-height: 1.6rem;
  border-radius: 8px;
  animation-delay: 0.05s;
`;

const QnaContent = styled(DivBackground)`
  width: 100%;
  height: 80%;
  padding: 1rem 1rem;
  min-height: 2rem;
  border-radius: 8px;
  animation-delay: 0.06s;
`;

export const QnaCardSkeleton = styled(Card)`
  background-color: ${({ theme: { isDark, bgColor } }) => bgColor};
  padding: 2rem;
  width: 100%;
  height: 180px;
  cursor: unset;
  border-radius: unset;
  border-bottom: 1px solid var(--colors-white-100);
  box-shadow: none;

  &:hover {
    box-shadow: unset;
    box-shadow: rgb(8 60 130 / 6%) 0 0 0 0.05rem, rgb(30 34 40 / 4%) 0 0 1.25rem;
  }

  @keyframes loading {
    to {
      background-position-x: -20%;
    }
  }
`;

const QnaListSkeleton = () => {
  return (
    <>
      <QnaCardSkeleton>
        <QnaTitle />
        <QnaContent />
      </QnaCardSkeleton>
      <QnaCardSkeleton>
        <QnaTitle />
        <QnaContent />
      </QnaCardSkeleton>
      <QnaCardSkeleton>
        <QnaTitle />
        <QnaContent />
      </QnaCardSkeleton>
      <QnaCardSkeleton>
        <QnaTitle />
        <QnaContent />
      </QnaCardSkeleton>
      <QnaCardSkeleton>
        <QnaTitle />
        <QnaContent />
      </QnaCardSkeleton>
      <QnaCardSkeleton>
        <QnaTitle />
        <QnaContent />
      </QnaCardSkeleton>
    </>
  );
};

export default QnaListSkeleton;
