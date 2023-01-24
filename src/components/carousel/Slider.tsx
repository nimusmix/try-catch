import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import SlideButton from './SlideButton';
import MiniTitle from '../font/MiniTitle';
import Paragraph from '../font/Paragraph';
import { isDarkState } from '../../recoil';

const SliderArea = styled.div`
  position: relative;
  overflow: hidden;
  height: auto;
  max-width: 18rem;
`;

const Slider = styled.div`
  position: relative;
  display: block;
  box-sizing: border-box;
`;

const SliderList = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  margin: 0;
`;

const SliderTrack = styled.div`
  position: relative;
  left: 50%;
  top: 0;
  display: flex;
  flex-direction: row;
  text-align: left;
  width: fit-content;
`;

const SliderItem = styled.div`
  position: relative;
  height: 100%;
  padding: 0 2.25rem;
  float: left;
  width: 17.5rem;
`;

const SliderItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 7.5rem;
`;

interface ICardCarouselProps {
  title: string;
  content: string;
}

const Card = ({ title, content }: Partial<ICardCarouselProps>) => {
  const isDark = useRecoilValue(isDarkState);
  return (
    <SliderItemDiv>
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
        sizeType="sm"
        style={{
          fontWeight: '400',
          lineHeight: '1rem',
        }}
        color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
      >
        {content}
      </Paragraph>
    </SliderItemDiv>
  );
};

const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>(() => {});
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id); // clean-up
    }
    return () => {};
  }, [delay]);
};
const items = [
  {
    id: 1,
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form...',
  },
  {
    id: 2,
    title: 'react-hook-form 정규표현식 관리방법2',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form...',
  },
  {
    id: 3,
    title: 'react-hook-form 정규표현식 관리방법3',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form...',
  },
  {
    id: 4,
    title: 'react-hook-form 정규표현식 관리방법4',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form...',
  },
  {
    id: 5,
    title: 'react-hook-form 정규표현식 관리방법5',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form...',
  },
  {
    id: 6,
    title: 'react-hook-form 정규표현식 관리방법6',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form...',
  },
];

const StyledSlider = () => {
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
              transform: `translateX(${(-100 / slides.length) * (0.5 + currentIndex)}%)`,
              transition: slideTransition,
            }}
          >
            {slides.map((slide, slideIndex) => {
              const newKeyId = slideIndex;

              return (
                <SliderItem key={newKeyId}>
                  <Card title={slide.title} content={slide.content} />
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
