import styled from 'styled-components';
import { MiniTitle, Div } from '../../components';
import StyledSlider from '../../components/carousel/Slider';

const PopularQnaWrapper = styled(Div)`
  margin-top: 1rem;
  border-radius: var(--borders-radius-base);
`;

const PopularQnaTitle = styled(MiniTitle)`
  font-size: var(--fonts-body-base);
  line-height: var(--lineHights-body-base);
  font-weight: 600;
`;

const PopularQna = () => {
  return (
    <PopularQnaWrapper padding="0rem">
      <PopularQnaTitle sizeType="xl" textAlign="left" padding="1.25rem 1.625rem 1rem 1.625rem">
        인기 Q&A
      </PopularQnaTitle>
      <StyledSlider />
    </PopularQnaWrapper>
  );
};

export default PopularQna;
