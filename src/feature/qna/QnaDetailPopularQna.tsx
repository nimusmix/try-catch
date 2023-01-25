import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { MiniTitle, Div, Paragraph, Button } from '../../components';
import { isDarkState } from '../../recoil';

interface IQnaDetailPopularQnaProps {
  questionId: number;
  author: {
    username: string;
    image?: string;
    company?: string;
  };
  title: string;
  content: string;
  category: string;
  tags: Array<string>;
  likeCount: number;
  answerCount: number;
  timestamp: number;
  isLiked: boolean;
  isSolved: boolean;
  isBookMarked: boolean;
}

const PopularQnaWrapper = styled(Div)`
  border-radius: var(--borders-radius-base);
  max-width: 288px;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const UpperTag = styled(Button)`
  cursor: default;
  &:hover {
    background-color: var(--colors-emph-500);
    color: var(--colors-white-500);
    border: 0.8px var(--colors-emph-500) solid;
  }
`;

const PopularQna = ({ title, answerCount, questionId }: Partial<IQnaDetailPopularQnaProps>) => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <PopularQnaWrapper padding="1.5rem">
      <UpperTag
        designType="purpleFill"
        fontSize="12px"
        padding="0.125rem 0.5rem"
        borderRadius="var(--borders-radius-base)"
        style={{ marginBottom: '0.5rem' }}
      >
        추천
      </UpperTag>
      <Link to={`/question/${questionId}`}>
        <MiniTitle
          textAlign="left"
          sizeType="xl"
          style={{
            fontSize: '1rem',
            fontWeight: '500',
            lineHeight: '1.25rem',
            marginBottom: '0.5rem',
          }}
        >
          {title}
        </MiniTitle>
      </Link>
      <Paragraph
        sizeType="xm"
        style={{
          fontWeight: '400',
          lineHeight: '1rem',
        }}
        color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
      >
        답변 {answerCount}
      </Paragraph>
    </PopularQnaWrapper>
  );
};

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
          const newKeyId = itemIdx;

          return (
            <PopularQna
              key={newKeyId}
              title={item.title}
              answerCount={item.answerCount}
              questionId={item.questionId}
            />
          );
        })}
      </div>
    </>
  );
};

export default QnaDetailPopularQna;
