import { HeaderImage, Layout } from '../../layout';
import { SubTitle, Paragraph } from '../../components';
import { header_feed } from '../../assets';

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
    </Layout>
  );
};

export default FeedPage;
