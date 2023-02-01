import React from 'react';
import styled from 'styled-components';
import { MiniTitle } from '../../../components';
import TagsInput from '../../hashtag-input/TagsInput';
import { useQuestionDispatch, useQuestionState } from '../../../context/QnaContext';

const Wrapper = styled.div`
  span {
    color: ${({ theme: { textColor100 } }) => textColor100};
    font-size: var(--fonts-body-base);
  }

  margin-bottom: 1.5rem;
`;
const QnaFormTagSection = () => {
  const { tags } = useQuestionState();
  const dispatch = useQuestionDispatch();

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      <MiniTitle sizeType="xl" textAlign="left">
        태그 <span>(최대 10개)</span>
      </MiniTitle>
      <TagsInput addTag={addTag} removeTag={removeTag} tags={tags} />
    </Wrapper>
  );
};

export default QnaFormTagSection;
