import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import MiniTitle from '../font/MiniTitle';
import useInterval from '../../hooks/useInterval';

interface ICarouselProps {
  active: string;
  title: string;
  content: string;
}

const SliderArea = styled.div`
  position: relative;
  overflow: hidden;
  height: auto;
  width: 100%;
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
  float: left;
  width: 100%;
  background-color: var(--colors-brand-100);
`;

const SliderItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 78%;
  margin: auto;
`;

const Card = ({ title }: Partial<ICarouselProps>) => {
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
          position: 'relative',
          top: '80%',
          left: '60%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.25rem 1.875rem 3.75rem',
        }}
        color="var(--colors-black-500)"
      >
        {title}
      </MiniTitle>
    </SliderItemDiv>
  );
};

const SlideshowDots = styled.div`
  position: absolute;
  text-align: center;
  bottom: 2%;
  left: calc(50% - 42px);
  z-index: 1;
`;

const SlideshowDot = styled.div<Partial<ICarouselProps>>`
  display: inline-block;
  height: 12px;
  width: 12px;
  border-radius: var(--borders-radius-round);
  bottom: 30px;

  cursor: pointer;
  margin: 0 0.5rem 0 0.5rem;

  background-color: ${({ active }) =>
    active === 'active' ? 'var(--colors-brand-500)' : 'var(--colors-white-300)'};
`;

const items = [
  {
    id: 1,
    title: '트라이 캐치가 분석한 2022 기술 동향레포트',
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
];

const SlideShow = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // 현재 슬라이드의 index를 저장할 state
  const itemSize = items.length;

  const transitionTime = 500;
  const transitionStyle = `transform ${transitionTime}ms ease 0s`;
  const [slideTransition, setTransition] = useState(transitionStyle);
  const addSlideNum = 1;
  const [isSwiping, setIsSwiping] = useState(false);

  const isResizing = useRef(false);
  const windowWidth = useWindowSize()[0];

  const getNewItemWidth = () => {
    const itemWidth = windowWidth > 1200 ? windowWidth : 1200;
    return itemWidth;
  };

  useEffect(() => {
    isResizing.current = true;
    setIsSwiping(true);
    setTransition('');
    setTimeout(() => {
      isResizing.current = false;
      if (!isResizing.current) setIsSwiping(false);
    }, 1000);
  }, [windowWidth]);

  // 양쪽에 임의의 slide 추가
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

  const handleSwipe = (index: number) => {
    setIsSwiping(true);
    handleSlide(index);
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
        <SlideshowDots>
          {items.map((item) => (
            <SlideshowDot
              key={item.id}
              active={`${
                currentIndex === item.id || currentIndex === item.id + items.length ? 'active' : ''
              }`}
              onClick={() => {
                handleSwipe(item.id);
              }}
              onMouseOut={() => setIsSwiping(false)}
            />
          ))}
        </SlideshowDots>
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
                <SliderItem key={newKeyId} style={{ width: getNewItemWidth(), height: '300px' }}>
                  <Card title={slide.title} />
                </SliderItem>
              );
            })}
          </SliderTrack>
        </SliderList>
      </Slider>
    </SliderArea>
  );
};
export default SlideShow;
