import styled from 'styled-components';
import { HeaderImage, Layout } from '../layout';
import { Paragraph, SubTitle } from '../components';
import { header_bookmark } from '../assets';
import BookmarkQuestionList from '../feature/bookmark/BookmarkQuestionList';
import SideNavbar from '../components/side-navbar/SideNavbar';
import { Aside } from '../pages/qna/QnaPage';

const navOptions = [
  { id: 1, option: '질문' },
  { id: 2, option: '피드' },
];

const BookmarkWrapper = styled.div`
  display: flex;
  margin: 3rem 0;

  nav {
    margin-right: 2rem;
  }
  button {
    margin-left: 1rem;
  }
`;

const Bookmark = () => {
  return (
    <Layout>
      <HeaderImage image={header_bookmark}>
        <SubTitle color="var(--colors-black-500)" margin="0 0 0.2rem 0">
          북마크
        </SubTitle>
        <Paragraph sizeType="base" color="var(--colors-black-400)">
          북마크 게시판에 대한 설명이 들어갈 자리입니다.
        </Paragraph>
      </HeaderImage>

      <BookmarkWrapper>
        <Aside>
          <SideNavbar navOptions={navOptions} />
        </Aside>
        <BookmarkQuestionList />
      </BookmarkWrapper>
    </Layout>
  );
};

export default Bookmark;
