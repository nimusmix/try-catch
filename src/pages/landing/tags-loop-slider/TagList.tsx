/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import InfiniteLoopSlider from './InfiniteLoopSlider';
import Tag from './Tag';
import { DURATION, ROWS, TAGS_PER_ROW } from '../../../constant';
import random from '../../../utils/random';
import shuffle from '../../../utils/shuffle';

const StyledTagList = styled.div`
  width: 50rem;
  max-width: 90vw;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  gap: 1rem 0;
  position: relative;
  padding: 1.5rem 0;
  overflow: hidden;

  :after {
    content: '';
    pointer-events: none;
    background: linear-gradient(
      90deg,
      ${({ theme: { bgColor } }) => bgColor},
      ${({ theme: { isDark } }) => (isDark ? 'transparent 30%' : 'transparent 10%')},
      ${({ theme: { isDark } }) => (isDark ? 'transparent 70%' : 'transparent 90%')},
      ${({ theme: { bgColor } }) => bgColor}
    );
    position: absolute;
    inset: 0;
  }
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TAGS = [
  'HTML',
  'CSS',
  'JavaScript',
  'Typescript',
  'Tailwind',
  'React',
  'Next.js',
  'Gatsby',
  'UI/UX',
  'SVG',
  'animation',
  'webdev',
  'Java',
  'Spring',
  'SpringBoot',
  'Docker',
  'Kubernetes',
];

const TagList = () => {
  return (
    <Wrapper>
      <StyledTagList>
        {[...new Array(ROWS)].map((_, i) => (
          <InfiniteLoopSlider
            key={i}
            duration={random(DURATION - 5000, DURATION + 5000)}
            reverse={i % 2}
          >
            {shuffle(TAGS)
              .slice(0, TAGS_PER_ROW)
              .map((tag) => (
                <Tag text={tag} key={tag} />
              ))}
          </InfiniteLoopSlider>
        ))}
      </StyledTagList>
    </Wrapper>
  );
};

export default TagList;
