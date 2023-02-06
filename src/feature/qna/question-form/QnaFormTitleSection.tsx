import React, { useEffect, useState } from 'react';
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
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-400)' : 'var(--colors-brand-100)'};
`;

const QnaFormTitleSection = () => {
  const [isTitleFocus, setIsTitleFocus] = useState(false);
  const { title } = useQuestionState();

  const dispatch = useQuestionDispatch();

  // const setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   console.log(e.target.value);
  //   dispatch({ type: 'SET_CATEGORY', category: e.target.value });
  // };

  /** (수정 후) 현 Dropdown 버전 작동 확인 후 위 주석 삭제 요망 */
  const [activeCategory, setActiveCategory] = useState('DEV');
  useEffect(() => {
    dispatch({ type: 'SET_CATEGORY', category: activeCategory });
  }, [activeCategory, dispatch]);

  const setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_TITLE', title: e.target.value });
  };

  return (
    <Wrapper>
      {/**
       * Dropdown 이전 버전
       * TODO 아래의 새 버전 기능 정상작동 확인 후 삭제 요망
       */}
      {/* <Dropdown
        items={[
          { text: '개발', value: 'DEV' },
          { text: '커리어', value: 'CAREER' },
        ]}
        onChange={setCategory}
      /> */}
      <Dropdown
        items={[
          { text: '개발', value: 'DEV' },
          { text: '커리어', value: 'CAREER' },
        ]}
        changeOption={setActiveCategory}
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
