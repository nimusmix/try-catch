import styled from 'styled-components';
import { HeaderImage, Layout } from '../../layout';
import { MiniTitle, Paragraph, SubTitle } from '../../components';
import { header_challenge } from '../../assets';
import { QuestionPageBody as ChallengePageBody } from '../qna/QnaPage';
import {
  ChallengeRank,
  OngoingChallenge,
  RecommendChallenge,
  OngoingChallengeVer3,
} from '../../feature/challenge';

const ChallengeRecommend = () => {
  return (
    <div style={{ margin: '0 2rem' }}>
      <MiniTitle sizeType="xl" textAlign="left" padding="1.25rem 0rem 1rem 0rem">
        42good님을 위한 추천 챌린지
      </MiniTitle>
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
      <ChallengeRank />
    </div>
  );
};

const ChallengeOngoing = () => {
  return (
    <div style={{ margin: '0 2rem' }}>
      <MiniTitle sizeType="xl" textAlign="left" padding="1.25rem 0rem 1rem 0rem">
        진행 중인 챌린지
      </MiniTitle>
      <OngoingChallengeVer3 />
    </div>
  );
};

const ChallengeHeader = styled(ChallengePageBody)``;
const ChallengeOngoingWrapper = styled(ChallengePageBody)`
  margin-top: 2rem;
`;

const ChallengesPage = () => {
  return (
    <Layout>
      <HeaderImage image={header_challenge}>
        <SubTitle>챌린지</SubTitle>
        <Paragraph sizeType="base">챌린지 게시판에 대한 설명이 들어갈 자리입니다.</Paragraph>
      </HeaderImage>
      <ChallengePageBody style={{ margin: '3rem 1.5rem', flexDirection: 'column' }}>
        {/* <ChallengeHeader>
          <ChallengeRecommend />
          <ChallengeRankWrapper />
        </ChallengeHeader> */}
        <ChallengeOngoingWrapper>
          <ChallengeOngoing />
        </ChallengeOngoingWrapper>
      </ChallengePageBody>
    </Layout>
  );
};

export default ChallengesPage;
