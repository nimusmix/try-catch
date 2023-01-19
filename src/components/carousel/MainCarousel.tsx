import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ICarouselProps {
  items: { id: number; bgColor: string; children: React.ReactNode }[];
  active: string;
  bgColor: string;
  transform: string;
}

const colors: { id: number; bgColor: string; children: React.ReactNode }[] = [
  {
    id: 0,
    bgColor: 'var(--colors-brand-100)',
    children: (
      <div
        style={{
          position: 'relative',
          top: '80%',
          left: '60%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.25rem 1.875rem 3.75rem',
          // fontSize: 'var(--fonts-desktop-heading-2xl)',
          // lineHeight: 'var(--lineHights-desktop-heading-2xl)',
        }}
      >
        트라이 캐치가 분석한 2022 기술 동향레포트
      </div>
    ),
  },
  { id: 1, bgColor: '#EAFDFC', children: <div>트라이 캐치2</div> },
  { id: 2, bgColor: '#EEF1FF', children: <div>트라이 캐치3</div> },
];

const delay = 2500;

const SlideshowWrapper = styled.div`
  margin: 0 auto;
  overflow: hidden;
`;

const SlideshowSlider = styled.div<Partial<ICarouselProps>>`
  white-space: nowrap;
  transition: ease 1000ms;
  transform: ${({ transform }) => transform};
`;

const Slide = styled.div<Partial<ICarouselProps>>`
  display: inline-block;

  height: 400px;
  width: 100%;
  background-color: ${({ bgColor }) => bgColor || 'red'};
`;

const SlideshowDots = styled.div`
  position: relative;
  bottom: 50px;
  text-align: center;
`;

const SlideshowDot = styled.div<Partial<ICarouselProps>>`
  display: inline-block;
  height: 16px;
  width: 16px;
  border-radius: var(--borders-radius-round);

  cursor: pointer;
  margin: 15px 7px 0px;

  background-color: ${({ active }) =>
    active === 'active' ? 'var(--colors-brand-500)' : 'var(--colors-white-300)'};
`;

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex === colors.length - 1 ? 0 : prevIndex + 1)),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

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
