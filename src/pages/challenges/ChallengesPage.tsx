// import styled from 'styled-components';
import { HeaderImage, Layout } from '../../layout';
import { MiniTitle, Paragraph, SubTitle } from '../../components';
import { header_challenge } from '../../assets';
import { ReactComponent as Recommend } from '../../assets/challenges/challenge_recommend.svg';
import { ReactComponent as Ranking } from '../../assets/challenges/challenge_ranking.svg';
import { QuestionPageBody as ChallengePageBody } from '../qna/QnaPage';
import { ChallengeRank, RecommendChallenge } from '../../feature/challenge';

const ChallengeRecommend = () => {
  return (
    <div style={{ margin: '0 2rem' }}>
      <MiniTitle sizeType="xl" textAlign="left" padding="1.25rem 0rem 1rem 0rem">
        42good님을 위한 추천 챌린지
      </MiniTitle>
      {/* <Recommend /> */}
      <RecommendChallenge />
    </div>
  );
};

const ChallengeRankWrapper = () => {
  return (
    <div>
      <MiniTitle sizeType="xl" textAlign="left" padding="1.25rem 0rem 1rem 0rem">
        챌린지 랭킹
      </MiniTitle>
      {/* <Ranking /> */}
      <ChallengeRank />
    </div>
  );
};

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
      <ChallengePageBody style={{ margin: '3rem 1.5rem 0' }}>
        <ChallengeRecommend />
        <ChallengeRankWrapper />
      </ChallengePageBody>
    </Layout>
  );
};

export default ChallengesPage;
