import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import './MainCarousel.css';

interface ICarouselProps {
  items: { id: number; bgcolor: string }[];
}

// const colors: { id: number; bgcolor: string }[] = [
//   { id: 0, bgcolor: '#0088FE' },
//   { id: 1, bgcolor: '#00C49F' },
//   { id: 2, bgcolor: '#FFBB28' },
// ];

const colors: { id: number; bgcolor: string }[] = [
  { id: 0, bgcolor: '#1' },
  { id: 1, bgcolor: '#2' },
  { id: 2, bgcolor: '#3' },
];
// const colors = ['#0088FE', '#00C49F', '#FFBB28'];

const delay = 2500;

const SlideshowWrapper = styled.div`
  margin: 0 auto;
  overflow: hidden;
  max-width: 500px;
`;

const Slideshow = (items: ICarouselProps) => {
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
    <div className="slideshow">
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {colors.map((item) => (
          <div className="slide" key={item.id} style={{ border: '1px solid' }}>
            {item.bgcolor}{' '}
          </div>
        ))}
      </div>

      {/* <div className="slideshowDots">
        {colors.map((item) => (
          <div
            key={item.id}
            className={`slideshowDot${index === item.id ? ' active' : ''}`}
            onClick={() => {
              setIndex(item.id);
            }}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Slideshow;
