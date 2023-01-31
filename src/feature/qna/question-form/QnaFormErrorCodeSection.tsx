import React, { useRef } from 'react';
import styled from 'styled-components';
import useTooltip from '../../../hooks/useTooltip';
import { MiniTitle } from '../../../components';
import MilkdownEditor from '../../text-editor/MilkdownEditor';

const TitleTooltip = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  width: 100px;
  height: 100px;
  background-color: blue;
`;

const QnaFormErrorCodeSection = () => {
  const errorCodeRef = useRef<HTMLDivElement>(null);
  const [isErrorCodeFocus, isErrorCodeBlur] = useTooltip(errorCodeRef);
  return (
    <>
      <MiniTitle sizeType="xl" textAlign="left">
        에러 코드
      </MiniTitle>
      <MilkdownEditor width="100%" ref={errorCodeRef} />
      <TitleTooltip isVisible={isErrorCodeBlur}>에러코드 블러</TitleTooltip>
    </>
  );
};

export default QnaFormErrorCodeSection;
