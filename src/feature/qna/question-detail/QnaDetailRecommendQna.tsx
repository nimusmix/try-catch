import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { isDarkState } from '../../../recoil';
import { Button, Div, MiniTitle, Paragraph } from '../../../components';

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
  background-color: ${({ theme: { isDark } }) => (isDark ? 'rgba(46, 52, 64, 1)' : '#f7f8ff')};
  border: ${({ theme: { isDark } }) => (isDark ? '' : '1px solid var(--colors-brand-200)')};
  border-radius: var(--borders-radius-base);
  max-width: 288px;
  margin-bottom: 1rem;
  cursor: pointer;
  padding: 1.5rem;
`;

const UpperTag = styled(Button)`
  cursor: default;
  &:hover {
    background-color: var(--colors-emph-500);
    color: var(--colors-white-500);
    border: 0.8px var(--colors-emph-500) solid;
  }
`;

const QnaDetailRecommendQna = ({
  title,
  answerCount,
  questionId,
}: Partial<IQnaDetailPopularQnaProps>) => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <PopularQnaWrapper>
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

export default QnaDetailRecommendQna;
