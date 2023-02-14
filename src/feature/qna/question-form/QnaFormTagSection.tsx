import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { MiniTitle, Paragraph } from '../../../components';
import { QuestionDispatch, useQuestionState } from '../../../context/QnaContext';
import TagsInput from '../../hashtag-input/TagsInput';
import { toastState } from '../../../recoil';
import useTooltip from '../../../hooks/useTooltip';

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
  span {
    color: ${({ theme: { textColor100 } }) => textColor100};
    font-size: var(--fonts-body-base);
  }
  .title {
    display: flex;
    margin: 2.5rem 0 0.5rem;
    align-items: center;
    justify-content: space-between;
    h3 {
      margin: 0;
    }
  }

  margin-bottom: 1.5rem;
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

const QnaFormTagSection = ({ dispatch }: { dispatch: QuestionDispatch }) => {
  const { tags } = useQuestionState();
  const tagsRef = useRef<HTMLInputElement>(null);
  const [isTagsFocus] = useTooltip(tagsRef);
  const setToast = useSetRecoilState(toastState);

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tags.length > 9) {
      setToast({
        type: 'negative',
        message: '태그는 최대 10개까지 등록 가능해요',
        isVisible: true,
      });
      return;
    }
    if (tags.includes(e.currentTarget.value)) {
      setToast({ type: 'negative', message: '이름이 같은 태그가 있어요', isVisible: true });
      return;
    }
    if (e.currentTarget.value !== '') {
      const newTag = e.currentTarget.value;
      dispatch({ type: 'SET_TAGS', tags: [...tags, newTag] });
      e.currentTarget.value = '';
    }
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = [...tags.filter((_: string, index: number) => index !== indexToRemove)];
    dispatch({ type: 'SET_TAGS', tags: newTags });
  };

  return (
    <Wrapper>
      <div className="title">
        <MiniTitle sizeType="xl" textAlign="left">
          태그 <span>(최대 10개)</span>
        </MiniTitle>
        <span>({tags.length}/10)</span>
      </div>
      <TagsInput addTag={addTag} removeTag={removeTag} tags={tags} ref={tagsRef} />

      <Tooltip className={isTagsFocus ? 'active' : ''}>
        <Paragraph sizeType="lg">💡 태그 작성 가이드</Paragraph>
        <Paragraph sizeType="base">
          태그는 회원님의 질문에 답해줄 수 있는 유저들의
          <br /> 관심을 끄는 데 도움이 됩니다.
        </Paragraph>
      </Tooltip>
    </Wrapper>
  );
};

export default QnaFormTagSection;
