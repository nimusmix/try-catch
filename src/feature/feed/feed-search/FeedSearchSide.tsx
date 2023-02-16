import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Checkbox, Paragraph } from '../../../components';
import FeedSearchBar from './FeedSearchBar';
import FeedTag from '../FeedTag';
import { IconRefresh } from '../../../components/icons/Icons';
import { media } from '../../../utils/media';

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

const FeedRecommendTags = styled.div`
  ${media.phone`
      display: none;
    `}
`;

export const FeedSearchWrapper = styled.div`
  border-radius: var(--borders-radius-xl);
  box-sizing: border-box;
  margin: 0;
  padding: 20px;
  color: var(--colors-black-500);
  list-style: none;
  position: relative;
  background: #fff;
  transition: all 300ms ease 0s;
  box-shadow: rgb(8 60 130 / 6%) 0px 0px 0px 0.05rem, rgb(30 34 40 / 4%) 0rem 0rem 1.25rem;
  margin-bottom: 25px !important;
  background-color: ${({ theme: { isDark } }) => (isDark ? 'rgba(46, 52, 64, 1)' : 'fff')};
`;

const ToolTip = styled.div`
  &.tooltip {
    position: relative;
    display: inline-block;
  }
  &.tooltip .tooltip-content {
    visibility: hidden;
    border-radius: var(--borders-radius-base);
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-300)' : 'var(--colors-brand-100)'};
    box-shadow: 0 3px 8px rgba(165, 165, 165, 0.5);
    padding: 5px 10px;

    height: 28px;
    width: 226px;
    color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-white-200)' : 'var(--colors-black-200)'};
    text-align: center;
    position: absolute;
    z-index: 1;
    left: 10%;
    transform: translateX(-50%);

    top: -40px;
    font-size: 12px;
    letter-spacing: -1px;
    transition: all 0.4s ease;

    visibility: hidden;
    opacity: 0;
    white-space: nowrap;
    em {
      color: var(--colors-brand-500);
      margin-left: 0.4rem;
      text-transform: none;
      text-decoration: underline;
      font-style: normal;
    }
  }
  @media (hover: hover) and (pointer: fine) {
    /* when supported */
    &.tooltip:hover .tooltip-content {
      visibility: visible;
      opacity: 1;
    }
    ${media.phone`
    &.tooltip:hover .tooltip-content {
      visibility: hidden;
      opacity: 1;
    }
    `}
  }
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
        <CheckboxWrapper key={searchFilterList[0].id}>
          <FilterTitle sizeType="sm" padding="0 0.5rem" id={`${searchFilterList[0].filterName}`}>
            {searchFilterList[0].filterName}
          </FilterTitle>
          <Checkbox
            label={String(searchFilterList[0].id)}
            checked={!!checkedItems.includes(searchFilterList[0].id)}
            onChange={onSingleCheck}
          />
        </CheckboxWrapper>
        <ToolTip className="tooltip">
          <CheckboxWrapper key={searchFilterList[1].id}>
            <FilterTitle sizeType="sm" padding="0 0.5rem" id={`${searchFilterList[1].filterName}`}>
              {searchFilterList[1].filterName}
            </FilterTitle>
            <Checkbox
              label={String(searchFilterList[1].id)}
              checked={!!checkedItems.includes(searchFilterList[1].id)}
              onChange={onSingleCheck}
            />
          </CheckboxWrapper>
          <div className="tooltip-content">
            <a
              target="_blank"
              href="https://www.lucenetutorial.com/lucene-query-syntax.html"
              rel="noreferrer"
            >
              💡 <em>Lucene Query</em>를 이용해 검색하실 수 있어요!
            </a>
          </div>
        </ToolTip>
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
      <FeedRecommendTags>
        <Hr />
        <Paragraph sizeType="base" padding="0" margin="0 0 15px 0" style={{ fontWeight: '500' }}>
          추천 태그 🏷️
        </Paragraph>
        <FeedTag tags={tagListProps} />
      </FeedRecommendTags>
    </FeedSearchWrapper>
  );
};

export default FeedSearchSide;
