import { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import { HeaderImage, Layout } from '../layout';
import { Paragraph, SubTitle } from '../components';
import { header_bookmark } from '../assets';
import BookmarkQuestionList from '../feature/bookmark/BookmarkQuestionList';
import SideNavbar from '../components/side-navbar/SideNavbar';
import { Aside } from '../pages/qna/QnaPage';

const navOptions = [
  { id: 1, option: '질문', value: '질문' },
  { id: 2, option: '피드', value: '피드' },
];

const BookmarkWrapper = styled.div`
  display: flex;

  button {
    margin-left: 1rem;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 3rem;
`;

const Bookmark = () => {
  const [activeCategory, setActiveCategory] = useState('질문');

  return (
    <Layout>
      <Helmet>
        <title>트라이캐치 | 북마크</title>
      </Helmet>
      <HeaderImage image={header_bookmark}>
        <SubTitle>북마크</SubTitle>
        <Paragraph sizeType="base">북마크 게시판에 대한 설명이 들어갈 자리입니다.</Paragraph>
      </HeaderImage>

      <BookmarkWrapper>
        <Aside>
          <SideNavbar navOptions={navOptions} changeOption={setActiveCategory} />
        </Aside>
        <ContentWrapper>
          <BookmarkQuestionList />
        </ContentWrapper>
      </BookmarkWrapper>
    </Layout>
  );
};

export default Bookmark;
