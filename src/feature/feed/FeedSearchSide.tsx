import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Checkbox, Paragraph } from '../../components';
import FeedSearchBar from './FeedSearchBar';
import FeedTag from './FeedTag';
import { IconRefresh } from '../../components/icons/Icons';

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
  margin-left: 0.5rem;

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

const Hr = styled.hr`
  margin: 0px 0px 18px;
  height: 0;
  overflow: visible;
  border: solid 0.5px
    ${({ theme: { isDark } }) => (isDark ? `var(--colors-black-200)` : 'rgb(8 60 130 / 6%)')};
`;

const FilterTitle = styled(Paragraph)``;
interface FeedSearchProps {
  tagListProps: Array<string>;
  getCheckData: (data: Array<number>) => void;
  keyword: string;
}

const FeedSearchWrapper = styled.div`
  border-radius: 15px;
  box-sizing: border-box;
  margin: 0;
  padding: 20px;
  color: #272b41;
  font-size: 15px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  position: relative;
  background: #fff;
  transition: all 300ms ease 0s;
  box-shadow: rgb(8 60 130 / 6%) 0px 0px 0px 0.05rem, rgb(30 34 40 / 4%) 0rem 0rem 1.25rem;
  margin-bottom: 25px !important;
  background-color: ${({ theme: { isDark } }) => (isDark ? 'rgba(46, 52, 64, 1)' : 'fff')};
`;

const FeedSearchSide = ({ tagListProps, getCheckData, keyword }: FeedSearchProps) => {
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
  if (advanced) advanced.setAttribute('data-tooltip', `💡 고급 검색 가이드`);

  const navigate = useNavigate();

  return (
    <FeedSearchWrapper>
      <SearchFilterWrapper>
        {keyword.length > 0 && (
          <Button
            onClick={() => navigate(`/feed`)}
            as="span"
            designType="redFill"
            fontSize="var(--fonts-body-xm)"
            padding="0.1rem 0.5rem"
            borderRadius="var(--borders-radius-base)"
            style={{ fontWeight: '500' }}
          >
            초기화
            <IconRefresh />
          </Button>
        )}
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
      {keyword.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          <Paragraph sizeType="sm" margin="auto 0.5rem auto 0">
            검색 키워드:{'  '}
          </Paragraph>
          <Paragraph sizeType="base">
            <Button
              as="span"
              designType="grayFill"
              fontSize="var(--fonts-body-sm)"
              padding="0 0.5rem"
              borderRadius="var(--borders-radius-base)"
              style={{ fontWeight: '500', margin: '0px' }}
            >
              {keyword}
            </Button>
          </Paragraph>
        </div>
      )}

      <Hr />
      <div>
        <Paragraph sizeType="base" padding="0" margin="0 0 15px 0">
          추천 태그 🏷️
        </Paragraph>
        <FeedTag tags={tagListProps} />
      </div>
    </FeedSearchWrapper>
  );
};

export default FeedSearchSide;
