import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { MiniTitle, Paragraph } from '../../../components';
import MilkdownEditor from '../../text-editor/MilkdownEditor';
import useTooltip from '../../../hooks/useTooltip';
import { QuestionDispatch, useQuestionState } from '../../../context/QnaContext';
import { Required } from '../../../pages/qna/QnaFormPage';

const bounce = keyframes`
  0% {
    scale: 0;
  }
  80%{
    scale: 1.05;
  }
  100% {
    scale: 1;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  input {
    margin-top: 1.5rem;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-400)' : 'var(--colors-brand-100)'};
  padding: 2rem 2.5rem;
  width: 400px;
  right: 0;
  translate: 110% 80px;
  z-index: 1000;
  border-radius: var(--borders-radius-base);

  & span {
    display: block;
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'rgb(46, 52, 64)' : 'var(--colors-brand-200)'};
    border-radius: var(--borders-radius-base);
    padding: 1rem;
    margin: 0.5rem 0;
  }

  scale: 0;
  transform-origin: left top;
  &.active {
    animation: ${bounce} 0.2s forwards;
  }

  & > p:first-child {
    margin-bottom: 0.5rem;
  }
`;

const QnaFormContentSection = ({
  dispatch,
  edit,
}: {
  dispatch: QuestionDispatch;
  edit: boolean;
}) => {
  const { content, category } = useQuestionState();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentFocus] = useTooltip(contentRef);

  const setContent = (value: string) => {
    dispatch({ type: 'SET_CONTENT', content: value });
  };

  return (
    <Wrapper>
      <MiniTitle sizeType="xl" textAlign="left" display="inline-flex">
        질문 내용 <Required>*</Required>
        <span className="alert">
          (코드박스는 <mark>Ctrl + Enter</mark>로 벗어날 수 있습니다.)
        </span>
      </MiniTitle>
      <MilkdownEditor
        width="100%"
        setState={setContent}
        ref={contentRef}
        data={content}
        edit={edit}
      />
      <Tooltip className={isContentFocus ? 'active' : ''}>
        <Paragraph sizeType="lg">💡 질문 내용 작성 가이드</Paragraph>
        {category === 'DEV' && (
          <Paragraph sizeType="base">
            어떤 상황에서 문제가 발생했는지 구체적으로 <br />
            작성해 주세요.
            <span>
              1. 어떤 방법을 시도해봤는지
              <br />
              2. 기대했던 동작
              <br />
              3. 어떤 문제점에 부딪혔는지 설명해주세요.
            </span>
            코드박스(```)를 활용해서 사용했던 코드를 재현해보는것도 하나의 방법일 수 있습니다.
            <br />
            현재 사용하는 소프트웨어의 버전 정보까지 포함하시면 더욱 좋은 답변을 받을 수 있습니다.
          </Paragraph>
        )}
        {category === 'CAREER' && (
          <Paragraph sizeType="base">
            어떤 상황에서 문제가 발생했는지 구체적으로 <br />
            작성해 주세요.
            <span>
              1. 무슨 고민이 있는지
              <br />
              2. 어떤 문제점에 부딪혔는지 설명해주세요.
            </span>
          </Paragraph>
        )}
      </Tooltip>
    </Wrapper>
  );
};

export default QnaFormContentSection;
