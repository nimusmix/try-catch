import React, { useRef } from 'react';
import styled from 'styled-components';
import { Dropdown, Input } from '../../../components';
import useTooltip from '../../../hooks/useTooltip';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin-top: 1.5rem;
  }
`;

const TitleTooltip = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  width: 100px;
  height: 100px;
  background-color: blue;
`;
const QnaFormTitleSection = () => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [isTitleFocus, isTitleBlur] = useTooltip(titleInputRef);
  return (
    <Wrapper>
      <Dropdown
        items={[
          { text: '개발', value: '개발' },
          { text: '커리어', value: '커리어' },
          { text: '밸런스 게임', value: '밸런스 게임' },
        ]}
      />
      <Input
        placeholder="제목을 입력해 주세요"
        ref={titleInputRef}
        width="100%"
        padding="0 0.5rem"
        height="2.5rem"
      />

      <TitleTooltip isVisible={isTitleFocus}>제목 토글테스트</TitleTooltip>
    </Wrapper>
  );
};

export default QnaFormTitleSection;
