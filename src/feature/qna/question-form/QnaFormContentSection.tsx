import React, { useRef } from 'react';
import styled from 'styled-components';
import { MiniTitle, Paragraph } from '../../../components';
import MilkdownEditor from '../../text-editor/MilkdownEditor';
import useTooltip from '../../../hooks/useTooltip';
import { QuestionDispatch, useQuestionState } from '../../../context/QnaContext';
import { Required } from '../../../pages/qna/QnaFormPage';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  input {
    margin-top: 1.5rem;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-400)' : 'var(--colors-brand-100)'};
  padding: 2rem 2.5rem;
  width: 400px;
  right: 0;
  translate: 110% 80px;
  z-index: 1000;
  border-radius: var(--borders-radius-base);

  & > p:first-child {
    margin-bottom: 0.5rem;
  }
`;

const QnaFormContentSection = ({ dispatch }: { dispatch: QuestionDispatch }) => {
  const { content } = useQuestionState();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentFocus] = useTooltip(contentRef);

  const setContent = (value: string) => {
    dispatch({ type: 'SET_CONTENT', content: value });
  };

  return (
    <Wrapper>
      <MiniTitle sizeType="xl" textAlign="left" display="inline-flex">
        질문 내용 <Required>*</Required>
      </MiniTitle>
      <MilkdownEditor width="100%" setState={setContent} ref={contentRef} data={content} />
      {isContentFocus && (
        <Tooltip>
          <Paragraph sizeType="base">💡 질문 내용 작성 가이드</Paragraph>
          <Paragraph sizeType="base">
            어떤 상황에서 문제가 발생했는지 구체적으로 작성해 주세요. 현재 사용하는 소프트웨어의
            버전 정보까지 포함하시면 더욱 좋은 답변을 받을 수 있습니다.
          </Paragraph>
        </Tooltip>
      )}
    </Wrapper>
  );
};

export default QnaFormContentSection;
