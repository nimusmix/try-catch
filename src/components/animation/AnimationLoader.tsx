import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export interface AnimationLoaderProps {
  width?: number;
  height?: number;
  animationData: any;
  autoplay: boolean;
  loop: boolean;
  opacity?: number;
}

const Container = styled.div<{ opacity?: number; width?: number; height?: number }>`
  opacity: ${({ opacity }) => opacity || '0.3'};
  ${({ width }) => width && `width: ${width}px`};
  ${({ height }) => height && `height: ${height}px`};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;
const AnimationLoader = ({
  width,
  height,
  animationData,
  autoplay,
  loop,
  opacity,
}: AnimationLoaderProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('lottie-web').then((Lottie) => {
      (Lottie as any).loadAnimation({
        container: container.current,
        renderer: 'svg',
        autoplay,
        loop,
        animationData,
      });
    });

    return () => {
      import('lottie-web').then((Lottie) => {
        (Lottie as any).destroy();
      });
    };
  }, [animationData, autoplay, loop]);

  return <Container ref={container} opacity={opacity} width={width} height={height} />;
};

export default AnimationLoader;
