import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CAROUSEL_DELAY } from '../../constant';

interface IItems {
  id: number;
  bgColor: string;
  children: React.ReactNode;
}
interface ICarouselProps {
  items: Array<IItems>;
  active: string;
  bgColor: string;
  transform: string;
}

const colors: Array<IItems> = [
  {
    id: 0,
    bgColor: 'var(--colors-brand-100)',
    children: (
      <div
        style={{
          position: 'relative',
          top: '80%',
          left: '54%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.25rem 1.875rem 3.75rem',
        }}
      >
        트라이 캐치가 분석한 2022 기술 동향레포트
      </div>
    ),
  },
  { id: 1, bgColor: '#EAFDFC', children: <div>트라이 캐치2</div> },
  { id: 2, bgColor: '#EEF1FF', children: <div>트라이 캐치3</div> },
];

const SlideshowWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
`;

const SlideshowSlider = styled.div<Partial<ICarouselProps>>`
  white-space: nowrap;
  transition: ease 1000ms;
  transform: ${({ transform }) => transform};
`;

const Slide = styled.div<Partial<ICarouselProps>>`
  display: inline-block;
  height: 300px;
  width: 100%;
  min-width: 1200px;
  background-color: ${({ bgColor }) => bgColor || 'red'};
`;

const SlideshowDots = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

const SlideshowDot = styled.div<Partial<ICarouselProps>>`
  position: relative;
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

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const [scroll, setScroll] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 300) {
        setScroll(true);
        resetTimeout();
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex === colors.length - 1 ? 0 : prevIndex + 1)),
      CAROUSEL_DELAY
    );
    return () => {
      window.removeEventListener('scroll', handleScroll); // clean up
      resetTimeout();
    };
  }, [index, scroll]);

  return (
    <SlideshowWrapper>
      <SlideshowSlider transform={`translate3d(${-index * 100}%, 0, 0)`}>
        {colors.map((item) => (
          <Slide key={item.id} bgColor={item.bgColor}>
            {item.children}
          </Slide>
        ))}
      </SlideshowSlider>
      <SlideshowDots>
        {colors.map((item) => (
          <SlideshowDot
            key={item.id}
            active={`${index === item.id ? 'active' : ''}`}
            onClick={() => {
              setIndex(item.id);
            }}
          />
        ))}
      </SlideshowDots>
    </SlideshowWrapper>
  );
};

export default Slideshow;
