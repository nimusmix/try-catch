import React from 'react';

import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { Paragraph, SubTitle } from '../../../components';
import { isDarkState } from '../../../recoil';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 3rem 0;
  h2 {
    margin-right: 2.5rem;
  }
`;
const QnaFormHeader = () => {
  const { questionId } = useParams();
  const isDark = useRecoilValue(isDarkState);
  return (
    <Wrapper>
      {questionId ? (
        <SubTitle textAlign="left">질문 수정</SubTitle>
      ) : (
        <SubTitle textAlign="left">질문 작성</SubTitle>
      )}
      <Paragraph
        color={isDark ? 'var(--colors-white-200)' : 'var(--colors-black-200)'}
        textAlign="left"
        sizeType="base"
      >
        안내에 따라 질문을 구체적으로 작성해주세요.
      </Paragraph>
    </Wrapper>
  );
};

export default QnaFormHeader;
