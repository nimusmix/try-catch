import { HeaderImage, Layout } from '../layout';
import { SubTitle, Paragraph } from '../components';
import { header_bookmark } from '../assets';
import BookmarkQuestionList from '../feature/bookmark/BookmarkQuestionList';

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

      <BookmarkQuestionList />
    </Layout>
  );
};

export default Bookmark;
