import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { MiniTitle, Paragraph } from '../../../components';
import MilkdownEditor from '../../text-editor/MilkdownEditor';
import useTooltip from '../../../hooks/useTooltip';
import { QuestionDispatch, useQuestionState } from '../../../context/QnaContext';

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

  scale: 0;
  transform-origin: left top;
  &.active {
    animation: ${bounce} 0.2s forwards;
  }

  & > p:first-child {
    margin-bottom: 0.5rem;
  }
`;

const QnaFormErrorCodeSection = ({
  dispatch,
  edit,
}: {
  dispatch: QuestionDispatch;
  edit: boolean;
}) => {
  const { errorCode } = useQuestionState();
  const errorCodeRef = useRef<HTMLDivElement>(null);
  const [isErrorCodeFocus] = useTooltip(errorCodeRef);

  const setErrorCode = (value: string) => {
    dispatch({ type: 'SET_ERROR_CODE', errorCode: value });
  };

  return (
    <Wrapper>
      <MiniTitle sizeType="xl" textAlign="left" display="inline-flex">
        에러 코드
      </MiniTitle>
      <MilkdownEditor
        width="100%"
        ref={errorCodeRef}
        setState={setErrorCode}
        data={errorCode}
        edit={edit}
      />
      <Tooltip className={isErrorCodeFocus ? 'active' : ''}>
        <Paragraph sizeType="lg">💡 에러코드 작성 가이드</Paragraph>
        <Paragraph sizeType="base">
          코드박스(```)를 활용하여 에러코드를 첨부 해보세요.
          <br />
          <br /> 에러코드는 필수항목은 아니지만 답변하는 유저들에게 도움이 될 수 있습니다.
        </Paragraph>
      </Tooltip>
    </Wrapper>
  );
};

export default QnaFormErrorCodeSection;
