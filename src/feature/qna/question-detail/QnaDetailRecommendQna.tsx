import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';
import { isDarkState } from '../../../recoil';
import { Button, Div, MiniTitle, Paragraph } from '../../../components';
import { IconBest } from '../../../components/icons/Icons';

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
  border: ${({ theme: { isDark } }) =>
    isDark ? 'rgb(46, 52, 64)' : '1px solid var(--colors-brand-200)'};
  border-radius: var(--borders-radius-base);
  max-width: 288px;
  min-width: 288px;
  margin-bottom: 1rem;
  cursor: pointer;
  padding: 0.5rem 1.5rem 1.5rem 1.5rem;

  .best {
    svg {
      rotate: -35deg;
      translate: -4px 9px;
    }
  }
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
    <PopularQnaWrapper as="li">
      <Link to={`/question/${questionId}`}>
        <span className="best">
          <IconBest width="14px" height="14px" />
        </span>
        <UpperTag
          designType="purpleFill"
          fontSize="12px"
          padding="0.125rem 0.5rem"
          borderRadius="var(--borders-radius-base)"
          style={{ marginBottom: '0.5rem' }}
        >
          인기
        </UpperTag>
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
      </Link>
    </PopularQnaWrapper>
  );
};

export default QnaDetailRecommendQna;
