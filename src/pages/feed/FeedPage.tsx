import { createRef, useState } from 'react';
import styled from 'styled-components';
import { HeaderImage, Layout } from '../../layout';
import { Paragraph, SubTitle } from '../../components';
import { header_feed } from '../../assets';
import { FeedList, FeedSearchBar, FeedTag, FeedView, FeedFilter } from '../../feature/feed';
import { QuestionPageBody as FeedPageBody } from '../qna/QnaPage';

const FeedTags = [
  { id: 1, tagName: 'react' },
  { id: 2, tagName: 'recoil' },
  { id: 3, tagName: 'docker' },
  { id: 4, tagName: 'JPA' },
  { id: 5, tagName: 'spring' },
  { id: 6, tagName: 'AWS' },
  { id: 7, tagName: 'PJT' },
  { id: 8, tagName: 'Fighting' },
  { id: 9, tagName: 'Aja Aja' },
];

const Aside = styled.aside`
  margin: 3rem 1.5rem 0;
  position: sticky;
  top: 6rem;
  left: 0;
  height: 500px;
  width: 17.75rem;
`;

const FilterTop = styled.section`
  display: flex;
  justify-content: right;
  margin-bottom: 1rem;
`;

const FeedPage = () => {
  const [activeFilterOption, setActiveFilterOption] = useState<string | null>('나의 관심순');
  const filter = createRef();

  const handleFilterOptionClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as Element;
    const filterOptionName = target.getAttribute('data-name');
    setActiveFilterOption(filterOptionName);
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
          <FeedSearchBar />
          <FeedTag tags={FeedTags} />
        </Aside>
        <section style={{ margin: '3rem 1.5rem 0' }}>
          <FilterTop>
            <FeedFilter
              ref={filter}
              currentOption={activeFilterOption}
              handleFilterOptionClick={handleFilterOptionClick}
            />
            <FeedView />
          </FilterTop>
          <FeedList />
        </section>
      </FeedPageBody>
    </Layout>
  );
};

export default FeedPage;
