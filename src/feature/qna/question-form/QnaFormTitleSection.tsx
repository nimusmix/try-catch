import React, { useState } from 'react';
import styled from 'styled-components';
import { Dropdown, Input, Paragraph } from '../../../components';
import { Tooltip } from './QnaFormContentSection';
import { useQuestionDispatch, useQuestionState } from '../../../context/QnaContext';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  input {
    margin-top: 1.5rem;
  }
`;

const TitleTooltip = styled(Tooltip)`
  translate: 110% -20px;
  width: 400px;
`;

const QnaFormTitleSection = () => {
  const [isTitleFocus, setIsTitleFocus] = useState(false);
  const { title } = useQuestionState();

  const dispatch = useQuestionDispatch();

  const setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_CATEGORY', category: e.target.value });
  };
  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_TITLE', title: e.target.value });
  };

  return (
    <Wrapper>
      <Dropdown
        items={[
          { text: '개발', value: 'DEV' },
          { text: '커리어', value: 'CAREER' },
        ]}
        onChange={setCategory}
      />
      <Input
        placeholder="제목을 입력해 주세요"
        width="100%"
        padding="0 0.5rem"
        height="2.5rem"
        value={title}
        onChange={setTitle}
        onFocus={() => setIsTitleFocus(true)}
        onBlur={() => setIsTitleFocus(false)}
      />
      {isTitleFocus && (
        <TitleTooltip>
          <Paragraph sizeType="base">💡 제목 작성 가이드</Paragraph>
          <Paragraph sizeType="base">
            다른 사람이 제목만 보고 내용을 파악할 수 있을 만큼 구체적으로 작성해 주세요.
          </Paragraph>
        </TitleTooltip>
      )}
    </Wrapper>
  );
};

export default QnaFormTitleSection;
