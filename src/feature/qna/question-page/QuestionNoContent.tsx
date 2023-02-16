import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import AnimationLoader from '../../../components/animation/AnimationLoader';
import noContent from '../../../assets/lottie/qna-no-content.json';
import { MiniTitle, Paragraph } from '../../../components';
import qnaSearchKeywordState from '../../../recoil/qnaSearchKeywordState';
import { media } from '../../../utils/media';

const Wrapper = styled.article`
  padding-top: 2rem;
  position: relative;
  width: 100%;
  height: 80%;
  cursor: pointer;
  z-index: 1000;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-500)' : 'var(--colors-white-500)'};

  h3 {
    margin-bottom: 0.2rem;
    em {
      display: inline-block;
      color: var(--colors-brand-500);
      margin-right: 0.5rem;
      text-transform: capitalize;
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.1rem;

      ${media.phone`
        max-width: 90%;
      `}
    }
  }

  ${media.phone`
    & > div{
      height: 300px;
      translate: 0 2rem;
    }
  `}
`;
const QuestionNoContent = () => {
  const keyword = useRecoilValue(qnaSearchKeywordState);
  return (
    <Wrapper>
      {keyword.length > 0 && (
        <MiniTitle sizeType="xl">
          <em>{keyword}</em>에 대한 검색결과가 없어요...
        </MiniTitle>
      )}
      {keyword.length === 0 && <MiniTitle sizeType="xl">검색결과가 없어요...</MiniTitle>}

      <Paragraph sizeType="base" textAlign="center">
        다른 키워드로 검색해보세요
      </Paragraph>
      <AnimationLoader animationData={noContent} autoplay loop />
    </Wrapper>
  );
};

export default QuestionNoContent;
