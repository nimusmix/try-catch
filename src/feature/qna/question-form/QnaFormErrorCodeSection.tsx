import React, { useRef } from 'react';
import styled from 'styled-components';
import { MiniTitle, Paragraph } from '../../../components';
import MilkdownEditor from '../../text-editor/MilkdownEditor';
import useQuestionDispatch from '../../../hooks/useQuestionDispatch';
import useTooltip from '../../../hooks/useTooltip';
import { Tooltip } from './QnaFormContentSection';

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

export default QnaFormErrorCodeSection;
