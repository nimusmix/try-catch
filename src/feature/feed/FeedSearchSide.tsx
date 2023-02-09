import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox, Paragraph } from '../../components';
import FeedSearchBar from './FeedSearchBar';
import FeedTag from './FeedTag';

const searchFilterList = [
  {
    id: 1,
    filterName: '구독 블로그만',
  },
  {
    id: 2,
    filterName: '고급검색',
  },
];

const SearchFilterWrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  flex-direction: row;
  margin-bottom: 0.5rem;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  flex-direction: row;
  margin-left: 1rem;

  /* TOOLTIP */
  [data-tooltip] {
    position: relative;
  }
  [data-tooltip]:before,
  [data-tooltip]:after {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    transition: all 0.2s ease;
    font-size: 12px;
    letter-spacing: -1px;
  }
  [data-tooltip]:before {
    content: attr(data-tooltip);
    height: 30px;
    position: absolute;
    top: -20px;
    padding: 5px 10px;
    border-radius: var(--borders-radius-base);
    color: var(--colors-black-200);
    background-color: var(--colors-brand-100);
    box-shadow: 0 3px 8px rgba(165, 165, 165, 0.5);
  }
  [data-tooltip]:not([data-tooltip='']):hover:before {
    visibility: visible;
    opacity: 1;
    top: -40px;
  }
  [data-tooltip]:not([data-tooltip='']):hover:after {
    visibility: visible;
    opacity: 1;
    top: -8px;
  }
`;

const FilterTitle = styled(Paragraph)``;
interface FeedSearchProps {
  tagListProps: Array<string>;
  getCheckData: (data: Array<number>) => void;
}

const FeedSearchSide = ({ tagListProps, getCheckData }: FeedSearchProps) => {
  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
      getCheckData([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
      getCheckData(checkedItems.filter((el) => el !== id));
    }
  };
  const onSingleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSingleCheck(e.target.checked, Number(e.target.id));
  };

  const advanced = document.getElementById('고급검색') as HTMLParagraphElement;
  if (advanced)
    advanced.setAttribute(
      'data-tooltip',
      `💡 고급 검색 가이드
  `
    );

  return (
    <>
      <SearchFilterWrapper>
        {searchFilterList.map((filterItem) => {
          const isChecked = !!checkedItems.includes(filterItem.id);

          return (
            <CheckboxWrapper key={filterItem.id}>
              <FilterTitle sizeType="sm" padding="0 0.5rem" id={`${filterItem.filterName}`}>
                {filterItem.filterName}
              </FilterTitle>
              <Checkbox
                label={String(filterItem.id)}
                checked={isChecked}
                onChange={onSingleCheck}
              />
            </CheckboxWrapper>
          );
        })}
      </SearchFilterWrapper>

      <FeedSearchBar />
      <FeedTag tags={tagListProps} />
    </>
  );
};

export default FeedSearchSide;
