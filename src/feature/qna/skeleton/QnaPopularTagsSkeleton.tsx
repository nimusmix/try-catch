import styled from 'styled-components';
import { Card } from '../../../components';
import random from '../../../utils/random';

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

const QnaTag = styled(DivBackground)<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  height: 1.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: var(--borders-radius-base);
  overflow: hidden;
`;

export const QnaCardSkeleton = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'rgba(46,52,64,1)' : 'var(--colors-white-500)'};
  padding: 2rem;
  width: 100%;
  margin-bottom: 1rem;
  cursor: unset;

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
const QnaTitle = styled(DivBackground)`
  display: block;
  margin: 0 0 1rem;
  font-size: 1.5rem;
  line-height: 1.5rem;
  min-height: 1.6rem;
  border-radius: 8px;
  animation-delay: 0.05s;
`;

const QnaPopularTagsSkeleton = () => {
  return (
    <QnaCardSkeleton>
      <QnaTitle />
      <QnaTag width={random(45, 90)} />
      <QnaTag width={random(45, 90)} />
      <QnaTag width={random(45, 90)} />
      <QnaTag width={random(45, 90)} />
      <QnaTag width={random(45, 90)} />
      <QnaTag width={random(45, 90)} />
      <QnaTag width={random(45, 90)} />
      <QnaTag width={random(45, 90)} />
      <QnaTag width={random(45, 90)} />
      <QnaTag width={random(45, 90)} />
      <QnaTag width={random(45, 90)} />
    </QnaCardSkeleton>
  );
};

export default QnaPopularTagsSkeleton;
