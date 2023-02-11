import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import SlideButton from './SlideButton';
import MiniTitle from '../font/MiniTitle';
import Paragraph from '../font/Paragraph';
import { isDarkState } from '../../recoil';
import { IQuestion } from '../../interface/qna';
import useInterval from '../../hooks/useInterval';

export const SliderArea = styled.div`
  position: relative;
  overflow: hidden;
  height: auto;
  max-width: 18rem;
  margin-bottom: 1.25rem;
`;

export const Slider = styled.div`
  position: relative;
  display: block;
  box-sizing: border-box;
`;

export const SliderList = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  margin: 0;
`;

export const SliderTrack = styled.div`
  position: relative;
  left: 50%;
  top: 0;
  display: flex;
  flex-direction: row;
  text-align: left;
  width: fit-content;
`;

export const SliderItem = styled.div`
  position: relative;
  height: 100%;
  padding: 0 2.25rem;
  float: left;
  width: 17.5rem;
`;

export const SliderItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 7.5rem;
  background-color: ${({ theme: { isDark } }) => (isDark ? 'rgba(46, 52, 64, 1)' : '#f7f8ff')};
  border: ${({ theme: { isDark } }) => (isDark ? '' : '1px solid var(--colors-brand-200)')};
  border-radius: var(--borders-radius-base);
  cursor: pointer;
  padding: 1rem 1.5rem;
`;

const QuestionBody = styled.div`
  margin: 0.5rem 0 0.5rem;
  max-height: 75px;
  overflow: hidden;

  .markdown * {
    background: unset;
    margin: unset;
    font: unset;
    font-size: var(--fonts-body-sm);
  }

  > * {
    display: -webkit-box;
    height: 38px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const Card = ({ questionId, title, content, answerCount }: Partial<IQuestion>) => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <SliderItemDiv>
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
        <QuestionBody>
          <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
            {content as string}
          </ReactMarkdown>
        </QuestionBody>
        <Paragraph
          sizeType="xm"
          style={{
            fontWeight: '400',
            // lineHeight: '1rem',
          }}
          color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
        >
          답변 {answerCount}
        </Paragraph>
      </Link>
    </SliderItemDiv>
  );
};

interface IPopularQnaProps {
  items: Array<IQuestion>;
}

const StyledSlider = ({ items }: IPopularQnaProps) => {
  const [currentIndex, setCurrentIndex] = useState(2); // 현재 슬라이드의 index를 저장할 state

  const itemSize = items.length;

  const transitionTime = 500;
  const transitionStyle = `transform ${transitionTime}ms ease 0s`;
  const [slideTransition, setTransition] = useState(transitionStyle);
  const addSlideNum = 2;
  const [isSwiping, setIsSwiping] = useState(false);

  // 양쪽에 임의의 slide
  const setSlides = () => {
    const addedFront = [];
    const addedLast = [];
    let index = 0;
    while (index < addSlideNum) {
      addedLast.push(items[index % itemSize]);
      addedFront.unshift(items[itemSize - 1 - (index % itemSize)]);
      index += 1;
    }

    return [...addedFront, ...items, ...addedLast];
  };
  const slides = setSlides();

  const replaceSlide = (index: number) => {
    setTimeout(() => {
      setTransition('');
      setCurrentIndex(index);
    }, transitionTime);
  };

  const handleSlide = (idx: number) => {
    let index = idx;
    setCurrentIndex(index);
    if (index - addSlideNum < 0) {
      index += itemSize;
      replaceSlide(index);
    } else if (index - addSlideNum >= itemSize) {
      index -= itemSize;
      replaceSlide(index);
    }
    setTransition(transitionStyle);
  };

  const handleSwipe = (direction: number) => {
    setIsSwiping(true);
    handleSlide(currentIndex + direction);
  };

  useInterval(
    () => {
      handleSlide(currentIndex + 1);
    },
    !isSwiping ? 2000 : null
  );

  return (
    <SliderArea>
      <Slider>
        <SlideButton direction="prev" onClick={() => handleSwipe(-1)} />
        <SlideButton direction="next" onClick={() => handleSwipe(1)} />
        <SliderList>
          <SliderTrack
            onMouseOver={() => setIsSwiping(true)}
            onMouseOut={() => setIsSwiping(false)}
            style={{
              transform: `translateX(${(-100 / slides.length) * (0.5 + currentIndex)}%)`,
              transition: slideTransition,
            }}
          >
            {slides.map((slide, slideIndex) => {
              const newKeyId = slideIndex;

              return (
                <SliderItem key={newKeyId}>
                  <Card {...slide} />
                </SliderItem>
              );
            })}
          </SliderTrack>
        </SliderList>
      </Slider>
    </SliderArea>
  );
};
export default StyledSlider;
