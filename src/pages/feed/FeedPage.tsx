import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { HeaderImage, Layout } from '../../layout';
import { Paragraph, SubTitle } from '../../components';
import { header_feed } from '../../assets';
import {
  CompanyRecommend,
  FeedFilter,
  FeedList,
  FeedSearchSide,
  FeedView,
} from '../../feature/feed';
import { QuestionPageBody as FeedPageBody } from '../qna/QnaPage';

const Aside = styled.aside`
  margin: 3rem 1.5rem 0;
  position: sticky;
  top: 6rem;
  height: 500px;
  width: 17.75rem;
`;

const FilterTop = styled.section`
  display: flex;
  justify-content: right;
  margin-bottom: 1rem;
`;

const filterOptions = [
  {
    id: 1,
    option: '나의 관심순',
  },
  {
    id: 2,
    option: '최신순',
  },
];

const FeedPage = () => {
  const [activeFilterOption, setActiveFilterOption] = useState('최신순');
  const [activeViewOption, setActiveViewOption] = useState<boolean>(true);
  const [tagListProps, setTagListProps] = useState<Array<string>>([]);
  const [checkedItemsProps, setCheckedItemsProps] = useState<Array<number>>([]);

  const keyword = new URLSearchParams(useLocation().search).get('keyword') || '';
  const subscribe = checkedItemsProps.includes(1);
  const advanced = checkedItemsProps.includes(2);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [keyword, subscribe, advanced]);

  const getData = (data: Array<string>) => {
    setTagListProps(data);
  };

  const getCheckData = (data: Array<number>) => {
    setCheckedItemsProps(data);
  };

  return (
    <Layout>
      <HeaderImage image={header_feed}>
        <SubTitle color="var(--colors-black-500)" margin="0 0 0.2rem 0">
          피드
        </SubTitle>
        <Paragraph sizeType="base" color="var(--colors-black-400)">
          Feed 게시판에 대한 설명이 들어갈 자리입니다.
        </Paragraph>
      </HeaderImage>
      <FeedPageBody>
        <Aside>
          <FeedSearchSide tagListProps={tagListProps} getCheckData={getCheckData} />
          <CompanyRecommend />
        </Aside>
        <section style={{ margin: '3rem 1.5rem 0' }}>
          <FilterTop>
            <FeedFilter filterOptions={filterOptions} changeOption={setActiveFilterOption} />
            <FeedView setActiveViewOption={setActiveViewOption} />
          </FilterTop>
          <FeedList
            activeViewOption={activeViewOption}
            keyword={keyword}
            subscribe={subscribe}
            advanced={advanced}
            getData={getData}
            activeFilterOption={activeFilterOption}
            tagListProps={tagListProps}
            checkedItemsProps={checkedItemsProps}
          />
        </section>
      </FeedPageBody>
    </Layout>
  );
};

export default FeedPage;
