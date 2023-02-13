import styled from 'styled-components';
import { useQuery } from 'react-query';
import { HeaderImage, Layout } from '../../layout';
import { Paragraph, SubTitle } from '../../components';
import { header_challenge } from '../../assets';
import { QuestionPageBody as ChallengePageBody } from '../qna/QnaPage';
import { ChallengeAll, OngoingChallengeVer3 } from '../../feature/challenge';
import { IChallengeItem } from '../../interface/challenge';
import { getChallengeList } from '../../apis/challenge/challenge';

const ChallengeHeader = styled(ChallengePageBody)``;
const ChallengeBodyWrapper = styled(ChallengePageBody)`
  margin-top: 2rem;
`;

// local 디자인 확인용 목업
// const challengeList = [
//   {
//     challengeId: 1,
//     title: '7일 7회 답변 챌린지',
//     content: '일주일 동안 7회의 답변을 남겨보세요! 당신의 지식 나눔이 질문자에게 큰 도움이 됩니다!',
//     imgSrc: 'https://raw.githubusercontent.com/trycatch-ssafy/logo/main/challengeId1.jpg',
//     state: 'ONGOING' as 'BEFORE' | 'ONGOING' | 'SUCCESS' | 'FAIL',
//     progress: 0,
//     startFrom: 1676176660000,
//     endAt: 1676695060000,
//     earnedAt: 1676176660000,
//   },
//   {
//     challengeId: 2,
//     title: '한 달 10회 답변 챌린지',
//     content:
//       '한 달 동안 TryCatch에서 10회 답변하며 지식을 나눠보세요! 꾸준한 답변을 남기다 보면 본인의 실력도 향상될 거예요!',
//     imgSrc: 'https://raw.githubusercontent.com/trycatch-ssafy/logo/main/challengeId2.jpg',
//     state: 'BEFORE' as 'BEFORE' | 'ONGOING' | 'SUCCESS' | 'FAIL',
//     progress: 0,
//     startFrom: null,
//     endAt: null,
//     earnedAt: null,
//   },
// ];

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
        <Paragraph sizeType="base">도전과제를 달성하며 재밌게 학습해보세요</Paragraph>
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
