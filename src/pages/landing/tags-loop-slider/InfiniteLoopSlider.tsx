import React from 'react';
import styled from 'styled-components';

const LoopSlider = styled.div<{ duration: string; direction: 'reverse' | 'normal' }>`
  .inner {
    display: flex;
    width: fit-content;
    animation: loop linear infinite ${({ direction }) => direction} ${({ duration }) => duration};
  }

  @keyframes loop {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

const InfiniteLoopSlider = ({ children, duration, reverse = false }: any) => {
  return (
    <LoopSlider duration={`${duration}ms`} direction={reverse ? 'reverse' : 'normal'}>
      <div className="inner">
        {children}
        {children}
      </div>
    </LoopSlider>
  );
};

export default InfiniteLoopSlider;
