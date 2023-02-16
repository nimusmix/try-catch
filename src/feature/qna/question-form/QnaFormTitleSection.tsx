import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Dropdown, Input, Paragraph } from '../../../components';
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

  .message {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;

    .validation-message {
      color: tomato;
    }

    .title-size {
      color: ${({ theme: { textColor100 } }) => textColor100};
    }
  }
`;

const TitleTooltip = styled.div`
  position: absolute;
  padding: 2rem 2.5rem;
  right: 0;
  z-index: 1000;
  translate: 110% -20px;
  width: 400px;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-400)' : 'var(--colors-brand-100)'};
  scale: 0;
  transform-origin: left bottom;
  border-radius: var(--borders-radius-base);

  span {
    font-size: 0.75rem;
  }

  &.active {
    animation: ${bounce} 0.2s forwards;
  }

  & > p:first-child {
    margin-bottom: 0.5rem;
  }
`;

const QnaFormTitleSection = ({ dispatch }: { dispatch: QuestionDispatch }) => {
  const { title, category } = useQuestionState();
  const [isTitleFocus, setIsTitleFocus] = useState(false);
  const [messageTrigger, setMessageTrigger] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(() => category);

  useEffect(() => {
    if (isTitleFocus) {
      setMessageTrigger(true);
    }
    if (title.trim().length > 10) {
      setMessageTrigger(false);
    }
  }, [isTitleFocus, title.length]);

  useEffect(() => {
    dispatch({ type: 'SET_CATEGORY', category: activeCategory });
  }, [activeCategory, dispatch]);

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
        changeOption={setActiveCategory}
      />
      <div className="message">
        <span className="validation-message">
          {messageTrigger && title.trim().length < 10 ? '제목은 최소 10자 이상이어야 합니다.' : ''}
        </span>
        <span className="title-size">({title.trim().length}/100)</span>
      </div>
      <Input
        placeholder="제목을 입력해 주세요"
        width="100%"
        padding="0 0.5rem"
        height="2.5rem"
        value={title}
        onChange={setTitle}
        onFocus={() => setIsTitleFocus(true)}
        onBlur={() => setIsTitleFocus(false)}
        minLength={10}
        maxLength={100}
        required
      />
      <TitleTooltip className={isTitleFocus ? 'active' : ''}>
        <Paragraph sizeType="lg">💡 제목 작성 가이드</Paragraph>
        <Paragraph sizeType="base">
          다른 사람이 제목만 보고 내용을 파악할 수 <br />
          있을 만큼 문제를 요약해서 작성해주세요. <span>(10~100자)</span>
        </Paragraph>
      </TitleTooltip>
    </Wrapper>
  );
};

export default QnaFormTitleSection;
