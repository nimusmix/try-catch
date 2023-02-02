import styled from 'styled-components';
import { MiniTitle } from '../../components';
import QnaDetailRecommendQna from './question-detail/QnaDetailRecommendQna';

const PopularQnaTitle = styled(MiniTitle)`
  font-size: var(--fonts-body-base);
  line-height: var(--lineHights-body-base);
  font-weight: 600;
`;

const items = [
  {
    questionId: 1,
    author: {
      username: '42good',
      image: 'https://avatars.githubusercontent.com/u/109320569?v=4',
      company: 'https://avatars.githubusercontent.com/u/109320569?v=4',
    },
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form...',
    category: '개발',
    tags: ['react', 'react-hook-form'],
    likeCount: 3,
    answerCount: 12,
    timestamp: 174183600,
    isLiked: false,
    isSolved: true,
    isBookMarked: false,
  },
  {
    questionId: 2,
    author: {
      username: '42good',
      image: 'https://avatars.githubusercontent.com/u/109320569?v=4',
      company: 'https://avatars.githubusercontent.com/u/109320569?v=4',
    },
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form...',
    category: '개발',
    tags: ['react', 'react-hook-form'],
    likeCount: 3,
    answerCount: 12,
    timestamp: 174183600,
    isLiked: false,
    isSolved: true,
    isBookMarked: false,
  },
  {
    questionId: 3,
    author: {
      username: '42good',
      image: 'https://avatars.githubusercontent.com/u/109320569?v=4',
      company: 'https://avatars.githubusercontent.com/u/109320569?v=4',
    },
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form...',
    category: '개발',
    tags: ['react', 'react-hook-form'],
    likeCount: 3,
    answerCount: 12,
    timestamp: 174183600,
    isLiked: false,
    isSolved: true,
    isBookMarked: false,
  },
];

const QnaDetailPopularQna = () => {
  return (
    <>
      <PopularQnaTitle sizeType="xl" textAlign="left" padding="0rem" margin="0 0 1rem 0">
        {items && items[0].category} 카테고리 인기 Q&A
      </PopularQnaTitle>
      <div>
        {items.map((item, itemIdx) => {
          const { title, answerCount, questionId } = item;
          const newKeyId = itemIdx;

          return (
            <QnaDetailRecommendQna
              key={newKeyId}
              title={title}
              answerCount={answerCount}
              questionId={questionId}
            />
          );
        })}
      </div>
    </>
  );
};

export default QnaDetailPopularQna;
