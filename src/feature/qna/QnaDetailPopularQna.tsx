import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { MiniTitle } from '../../components';
import QnaDetailRecommendQna from './question-detail/QnaDetailRecommendQna';
import { getPopularQuestion } from '../../apis/qna/qna';
import qnaCategoryState from '../../recoil/qnaCategoryState';
import categoryToKorean from '../../utils/category-to-korean';
import QnaPopularSkeleton from './skeleton/QnaPopularSkeleton';
import { media } from '../../utils/media';

const PopularQnaTitle = styled(MiniTitle)`
  font-size: var(--fonts-body-base);
  line-height: var(--lineHights-body-base);
  font-weight: 600;
`;

const UL = styled.ul`
  ${media.phone`
     display: flex;
     overflow-x: scroll;
     padding-bottom: 1rem;
     
     
  &::-webkit-scrollbar{
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb{
    height: 30%; /* 스크롤바의 길이 */
    background: var(--colors-brand-500); /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme: { isDark } }: any) =>
      isDark ? 'var(--colors-black-100)' : 'var(--colors-brand-200)'};
  }
     
     li{
     
      margin: 0;
      margin-right: 1rem;
     }
  `}
`;

const QnaDetailPopularQna = () => {
  const selectedCategory = useRecoilValue(qnaCategoryState) as 'DEV' | 'CAREER';
  const { data: items, isLoading } = useQuery(
    ['questionList', 'popular', 'question'],
    getPopularQuestion({ category: selectedCategory, size: 3 })
  );
  return (
    <>
      <PopularQnaTitle sizeType="xl" textAlign="left" padding="0rem" margin="0 0 1rem 0">
        {items && categoryToKorean(items[0].category)} 카테고리 인기 Q&A 🔥
      </PopularQnaTitle>
      <UL>
        {isLoading && (
          <>
            <QnaPopularSkeleton />
            <QnaPopularSkeleton />
            <QnaPopularSkeleton />
          </>
        )}
        {!!items &&
          items.map((item) => {
            const { title, answerCount, questionId } = item;
            return (
              <QnaDetailRecommendQna
                key={questionId}
                title={title}
                answerCount={answerCount}
                questionId={questionId}
              />
            );
          })}
      </UL>
    </>
  );
};

export default QnaDetailPopularQna;
