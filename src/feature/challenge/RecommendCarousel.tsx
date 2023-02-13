import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SlideButton from '../../components/carousel/SlideButton';
import { Button, MiniTitle, Paragraph } from '../../components';
import { Slider, SliderItemDiv, SliderList, SliderTrack } from '../../components/carousel/Slider';
import useInterval from '../../hooks/useInterval';

const SliderArea = styled.div`
  position: relative;
  overflow: hidden;
  /* height: auto; // 높이 변경 */
  height: 11.375rem;
  max-width: 49.625rem; // slider 크기 변경
`;

const SliderItem = styled.div`
  position: relative;
  height: 80%;
  padding: 2rem 2.25rem;
  float: left;
  width: 17.5rem; // item 크기 변경
  margin: 1rem 2rem; // 마진 추가
  background-color: var(--colors-brand-100); // 배경 색상 추가
  border-radius: var(--borders-radius-base);
`;

interface ICardCarouselProps {
  challengeId: number;
  title: string;
  content: Array<string>;
  buttonContent: string;
}

const Card = ({ challengeId, title, content, buttonContent }: Partial<ICardCarouselProps>) => {
  return (
    <SliderItemDiv>
      <MiniTitle
        textAlign="left"
        sizeType="xl"
        style={{
          // fontSize: '1rem',
          fontWeight: '600',
          // lineHeight: '1.25rem',
          marginBottom: '1rem',
          color: 'var(--colors-black-500)',
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
        color="var(--colors-black-500)"
      >
        {content && content[0]}
      </Paragraph>
      <Paragraph
        sizeType="xm"
        style={{
          fontWeight: '400',
          lineHeight: '1rem',
        }}
        color="var(--colors-black-500)"
      >
        {content && content[1]}
      </Paragraph>
      <div
        style={{
          position: 'absolute',
          right: '1rem',
          bottom: '1rem',
        }}
      >
        <Link to={`${challengeId}`}>
          <Button fontSize="var(--fonts-body-xm)">{buttonContent}</Button>
        </Link>
      </div>
    </SliderItemDiv>
  );
};

const items = [
  {
    challengeId: 1,
    title: '1월 챌린지',
    content: ['질문 5분 이내 답변', ' 피드 5개 이상 읽기'],
    buttonContent: '챌린지 시작',
  },
  {
    challengeId: 2,
    title: '1월 챌린지2',
    content: ['질문 5분 이내 답변', ' 피드 5개 이상 읽기'],
    buttonContent: '챌린지 시작',
  },
  {
    challengeId: 3,
    title: '1월 챌린지3',
    content: ['질문 5분 이내 답변', ' 피드 5개 이상 읽기'],
    buttonContent: '챌린지 시작',
  },
  {
    challengeId: 4,
    title: '1월 챌린지4',
    content: ['질문 5분 이내 답변', ' 피드 5개 이상 읽기'],
    buttonContent: '챌린지 시작',
  },
  {
    challengeId: 5,
    title: '1월 챌린지5',
    content: ['질문 5분 이내 답변', ' 피드 5개 이상 읽기'],
    buttonContent: '챌린지 시작',
  },
  {
    challengeId: 6,
    title: '1월 챌린지6',
    content: ['질문 5분 이내 답변', ' 피드 5개 이상 읽기'],
    buttonContent: '챌린지 시작',
  },
];

const RecommendCarousel = () => {
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
      addedLast.push(items[index % items.length]);
      addedFront.unshift(items[items.length - 1 - (index % items.length)]);
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
              transform: `translateX(${(-100 / slides.length) * currentIndex}%)`,
              transition: slideTransition,
              height: '11.375rem',
            }}
          >
            {slides.map((slide, slideIndex) => {
              const newKeyId = slideIndex;

              return (
                <SliderItem key={newKeyId}>
                  <Card
                    title={slide.title}
                    content={slide.content}
                    buttonContent={slide.buttonContent}
                  />
                </SliderItem>
              );
            })}
          </SliderTrack>
        </SliderList>
      </Slider>
    </SliderArea>
  );
};
export default RecommendCarousel;
