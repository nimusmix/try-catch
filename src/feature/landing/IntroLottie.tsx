import React from 'react';
import styled from 'styled-components';
import AnimationLoader from '../../components/animation/AnimationLoader';
import intro from '../../assets/lottie/landing-intro.json';

const Wrapper = styled.article`
  translate: -200px -100px;
  position: relative;
  flex: 1;
  padding-top: 2rem;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-500)' : 'var(--colors-white-500)'};

  h3 {
    margin-bottom: 0.2rem;
    em {
      color: var(--colors-brand-500);
      margin-right: 0.5rem;
      text-transform: capitalize;
    }
  }
`;
const IntroLottie = ({ innerRef, className }: { innerRef: any; className: string }) => {
  return (
    <Wrapper ref={innerRef} className={className}>
      <AnimationLoader animationData={intro} autoplay loop opacity={1} width={800} height={600} />
    </Wrapper>
  );
};

export default IntroLottie;
