import React, { useRef } from 'react';
import styled from 'styled-components';
import { MiniTitle, Paragraph } from '../../../components';
import MilkdownEditor from '../../text-editor/MilkdownEditor';
import useTooltip from '../../../hooks/useTooltip';
import { Tooltip } from './QnaFormContentSection';
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
        에러 코드 <Required>*</Required>
      </MiniTitle>
      <MilkdownEditor
        width="100%"
        ref={errorCodeRef}
        setState={setErrorCode}
        data={errorCode}
        edit={edit}
      />
      {isErrorCodeFocus && (
        <Tooltip>
          <Paragraph sizeType="base">💡 에러코드 작성 가이드</Paragraph>
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
