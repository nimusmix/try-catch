import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export interface AnimationLoaderProps {
  name: string;
  path: string;
  width: string;
  height: string;
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
const AnimationLoader = ({ name, path }: AnimationLoaderProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('lottie-web').then((Lottie) => {
      (Lottie as any).loadAnimation({
        container: container.current,
        path,
        name,
        renderer: 'svg',
        autoplay: true,
      });
    });

    return () => {
      import('lottie-web').then((Lottie) => {
        (Lottie as any).destroy();
      });
    };
  }, [path, name]);

  return <Container ref={container} />;
};

export default AnimationLoader;
