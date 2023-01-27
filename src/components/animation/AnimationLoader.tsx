import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import animationData from '../../assets/cat-ch-404.json';

export interface AnimationLoaderProps {
  width?: string;
  height?: string;
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
const AnimationLoader = ({ width, height }: AnimationLoaderProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('lottie-web').then((Lottie) => {
      (Lottie as any).loadAnimation({
        container: container.current,
        renderer: 'svg',
        autoplay: true,
        loop: true,
        animationData,
      });
    });

    return () => {
      import('lottie-web').then((Lottie) => {
        (Lottie as any).destroy();
      });
    };
  }, []);

  return <Container ref={container} />;
};

export default AnimationLoader;
