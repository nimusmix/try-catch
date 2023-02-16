import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { getPopularQuestion } from '../../../apis/qna/qna';
import { Div, MiniTitle } from '../../../components';
import { IQuestion } from '../../../interface/qna';
import qnaCategoryState from '../../../recoil/qnaCategoryState';
import QnaPopularCarouselSkeleton from '../skeleton/QnaPopularCarouselSkeleton';
import StyledSlider from '../../../components/carousel/Slider';

export const PopularQnaWrapper = styled(Div)`
  margin-top: 1rem;
  border-radius: var(--borders-radius-base);
  overflow: hidden;
`;

const PopularQnaTitle = styled(MiniTitle)`
  font-size: var(--fonts-body-base);
  line-height: var(--lineHights-body-base);
  font-weight: 600;
`;

const PopularQna = () => {
  const activeCategory = useRecoilValue(qnaCategoryState);
  const [canRender, setCanRender] = useState(false);

  const size = 5;
  const { isLoading, data: popularQuestion } = useQuery<Array<IQuestion>>(
    ['popularQuestion', activeCategory] as const,
    getPopularQuestion({ category: activeCategory as 'DEV' | 'CAREER', size })
  );

  return (
    <PopularQnaWrapper padding="0rem">
      <PopularQnaTitle sizeType="xl" textAlign="left" padding="1.25rem 1.625rem 1rem 1.625rem">
        인기 Q&A 🔥
      </PopularQnaTitle>
      {isLoading && <QnaPopularCarouselSkeleton />}
      {popularQuestion && <StyledSlider items={popularQuestion} />}
    </PopularQnaWrapper>
  );
};

export default PopularQna;
