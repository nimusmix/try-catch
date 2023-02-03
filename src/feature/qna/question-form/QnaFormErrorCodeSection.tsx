import React, { useRef } from 'react';
import styled from 'styled-components';
import { MiniTitle, Paragraph } from '../../../components';
import MilkdownEditor from '../../text-editor/MilkdownEditor';
import useTooltip from '../../../hooks/useTooltip';
import { Tooltip } from './QnaFormContentSection';
import { useQuestionDispatch } from '../../../context/QnaContext';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  input {
    margin-top: 1.5rem;
  }
`;

const QnaFormErrorCodeSection = () => {
  const errorCodeRef = useRef<HTMLDivElement>(null);
  const [, isErrorCodeBlur] = useTooltip(errorCodeRef);

  const dispatch = useQuestionDispatch();

  const setErrorCode = (value: string) => {
    dispatch({ type: 'SET_ERROR_CODE', errorCode: value });
  };

  return (
    <Wrapper>
      <MiniTitle sizeType="xl" textAlign="left">
        에러 코드
      </MiniTitle>
      <MilkdownEditor width="100%" ref={errorCodeRef} setState={setErrorCode} />
      {isErrorCodeBlur && (
        <Tooltip>
          <Paragraph sizeType="base">
            💡 입력하신 코드와 유사한 질문이 <strong>n건</strong> 존재합니다.
          </Paragraph>
          <ul>
            <li>
              <Paragraph sizeType="base">유사질문 1</Paragraph>
            </li>
            <li>
              <Paragraph sizeType="base">유사질문 2</Paragraph>
            </li>
            <li>
              <Paragraph sizeType="base">유사질문 3</Paragraph>
            </li>
          </ul>
        </Tooltip>
      )}
    </Wrapper>
  );
};

export default QnaFormErrorCodeSection;
