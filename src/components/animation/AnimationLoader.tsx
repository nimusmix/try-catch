import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export interface AnimationLoaderProps {
  width?: string;
  height?: string;
  animationData: any;
  autoplay: boolean;
  loop: boolean;
}

const Container = styled.div`
  opacity: 0.3;
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

  return <Container ref={container} />;
};

export default AnimationLoader;
