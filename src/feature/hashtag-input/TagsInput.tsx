import React from 'react';
import styled from 'styled-components';
import { IconX } from '../../components/icons/Icons';

const STagInput = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  padding: 0 8px;
  border: 1px solid rgb(214, 216, 218);
  border-radius: 6px;

  &:focus-within {
    border: 1px solid var(--colors-brand-500);
  }

  input {
    flex: 1;
    border: none;
    height: 46px;
    font-size: 14px;
    padding: 4px 0 0 0;
    background-color: transparent;

    &:focus {
      outline: transparent;
    }
  }
`;

const TagsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 8px 0 0 0;
`;

const Tag = styled.li`
  width: auto;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 8px;
  font-size: 14px;
  list-style: none;
  border-radius: 6px;
  margin: 0 8px 8px 0;
  background: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-brand-500)' : 'var(--colors-brand-200)'};
  text-transform: capitalize;
  .tag-title {
    color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-white-500)' : 'var(--colors-black-200)'};
  }
  .tag-close-icon {
    margin-left: 8px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }
`;

const TagsInput = ({ addTag, removeTag, tags }: any) => {
  return (
    <STagInput>
      <TagsList>
        {tags.map((tag: string, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <Tag key={index} className="tag">
            <span className="tag-title">{tag}</span>
            <span className="tag-close-icon" onClick={() => removeTag(index)} key={1}>
              <IconX />
            </span>
          </Tag>
        ))}
      </TagsList>
      <input
        type="text"
        onKeyUp={(e) => (e.key === 'Enter' ? addTag(e) : null)}
        placeholder="쉼표 혹은 엔터를 입력해서 태그를 등록할 수 있습니다."
      />
    </STagInput>
  );
};

export default TagsInput;
