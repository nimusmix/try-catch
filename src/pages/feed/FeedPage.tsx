import { HeaderImage, Layout } from '../../layout';
import { SubTitle, Paragraph } from '../../components';
import { header_feed } from '../../assets';
import { FeedSearchBar, FeedTag } from '../../feature/feed';

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

const FeedPage = () => {
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
      <section style={{ display: 'flex' }}>
        <aside style={{ margin: '0 1.5rem 0', width: '17.75rem' }}>
          <FeedSearchBar />
          <FeedTag tags={FeedTags} />
        </aside>
        <section style={{ margin: '0 1.5rem 0' }}>
          <div>리스트 아이템</div>
        </section>
      </section>
    </Layout>
  );
};

export default FeedPage;
