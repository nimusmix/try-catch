import { HeaderImage, Layout } from '../../layout';
import { Paragraph, SubTitle } from '../../components';
import { header_challenge } from '../../assets';

const ChallengesPage = () => {
  return (
    <Layout>
      <HeaderImage image={header_challenge}>
        <SubTitle color="var(--colors-black-500)" margin="0 0 0.2rem 0">
          챌린지
        </SubTitle>
        <Paragraph sizeType="base" color="var(--colors-black-400)">
          챌린지 게시판에 대한 설명이 들어갈 자리입니다.
        </Paragraph>
      </HeaderImage>
    </Layout>
  );
};

export default ChallengesPage;
