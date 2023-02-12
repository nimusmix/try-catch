import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { HeaderImage, Layout } from '../../layout';
import { MiniTitle, Paragraph, SubTitle } from '../../components';
import { header_challenge } from '../../assets';
import { QuestionPageBody as ChallengePageBody } from '../qna/QnaPage';
import { ChallengeAll, OngoingChallengeVer3 } from '../../feature/challenge';
import { IChallengeItem } from '../../interface/challenge';
import { getChallengeList } from '../../apis/challenge/challenge';

const ChallengeHeader = styled(ChallengePageBody)``;
const ChallengeBodyWrapper = styled(ChallengePageBody)`
  margin-top: 2rem;
`;

const ChallengesPage = () => {
  const { data: challengeList, isLoading } = useQuery<Array<IChallengeItem>>(
    ['challengeList'] as const,
    getChallengeList
  );

  /** TODO 챌린지 페이지 로딩 스켈레톤 만들기 */
  if (isLoading) {
    return <h1>isLoading...</h1>;
  }
  return (
    <Layout>
      <HeaderImage image={header_challenge}>
        <SubTitle>챌린지</SubTitle>
        <Paragraph sizeType="base">챌린지 게시판에 대한 설명이 들어갈 자리입니다.</Paragraph>
      </HeaderImage>
      <ChallengePageBody
        style={{ margin: '3rem 1.5rem', flexDirection: 'column', width: '1200px' }}
      >
        <ChallengeHeader>
          {challengeList && <OngoingChallengeVer3 challengeList={challengeList} />}
        </ChallengeHeader>
        <ChallengeBodyWrapper>
          {challengeList && <ChallengeAll challengeList={challengeList} />}
        </ChallengeBodyWrapper>
      </ChallengePageBody>
    </Layout>
  );
};

export default ChallengesPage;
