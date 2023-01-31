import React, { useRef } from 'react';
import styled from 'styled-components';
import { MiniTitle } from '../../../components';
import MilkdownEditor from '../../text-editor/MilkdownEditor';
import useTooltip from '../../../hooks/useTooltip';

const TitleTooltip = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  width: 100px;
  height: 100px;
  background-color: blue;
`;
const QnaFormContentSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentFocus, isContentBlur] = useTooltip(contentRef);
  return (
    <>
      <MiniTitle sizeType="xl" textAlign="left">
        질문 내용
      </MiniTitle>
      <MilkdownEditor width="100%" ref={contentRef} />
      <TitleTooltip isVisible={isContentFocus}>내용 포커스</TitleTooltip>
    </>
  );
};

export default QnaFormContentSection;
