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
`;
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

  // console.log(checkedItems);
  return (
    <>
      <SearchFilterWrapper>
        {searchFilterList.map((filterItem) => {
          const isChecked = !!checkedItems.includes(filterItem.id);

          return (
            <CheckboxWrapper key={filterItem.id}>
              <Paragraph sizeType="sm" padding="0 0.5rem">
                {filterItem.filterName}
              </Paragraph>
              <Checkbox
                label={String(filterItem.id)}
                checked={isChecked}
                onChange={onSingleCheck}
              />
            </CheckboxWrapper>
          );
        })}
      </SearchFilterWrapper>

      <FeedSearchBar checkedItems={checkedItems} />
      <FeedTag tags={tagListProps} checkedItems={checkedItems} />
    </>
  );
};

export default FeedSearchSide;
