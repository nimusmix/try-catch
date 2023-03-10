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
        μλ¬ μ½λ
      </MiniTitle>
      <MilkdownEditor
        width="100%"
        ref={errorCodeRef}
        setState={setErrorCode}
        data={errorCode}
        edit={edit}
      />
      <Tooltip className={isErrorCodeFocus ? 'active' : ''}>
        <Paragraph sizeType="lg">π‘ μλ¬μ½λ μμ± κ°μ΄λ</Paragraph>
        <Paragraph sizeType="base">
          μ½λλ°μ€(```)λ₯Ό νμ©νμ¬ μλ¬μ½λλ₯Ό μ²¨λΆ ν΄λ³΄μΈμ.
          <br />
          <br /> μλ¬μ½λλ νμν­λͺ©μ μλμ§λ§ λ΅λ³νλ μ μ λ€μκ² λμμ΄ λ  μ μμ΅λλ€.
        </Paragraph>
      </Tooltip>
    </Wrapper>
  );
};

export default QnaFormErrorCodeSection;
