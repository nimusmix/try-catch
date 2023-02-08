import styled from 'styled-components';
import { Button, Card, MiniTitle, Paragraph } from '../../components';

interface IOngoingChallenge {
  challengeId: number; // 챌린지 번호
  // badge: string; // 획득 뱃지 이름 (img 로고 처럼 가져올 예정)
  name: string; // 챌린지 이름
  content: string; // 챌린지 설명
  // progress: number; // 진행률 ( 1 ~ 100 사이 숫자)
  // successNumber: number; // 성공한 사람의 수
  imgSrc: string;
}

const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--colors-white-100);
  margin: auto 0;
`;

// const ChallengeItem = ({
//   badge, // 뱃지 이미지 링크
//   name, // 챌린지 명
//   content, // 챌린지 설명
//   challengeId, // 챌린지 Id
// }: Partial<IOngoingChallenge>) => {
//   /* TODO 뱃지 추후 변경 예정 */
//   return (
//     <div style={{ width: '700px' }}>
//       <Td style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Badge>{badge}</Badge>
//         <div style={{ width: ' 500px' }}>
//           <strong>{name}</strong>
//           <br />
//           {content}
//         </div>
//       </Td>
//     </div>
//   );
// };

const StyledWrapper = styled.section`
  .row {
    display: flex;
    .col {
      flex: 1;
      max-width: 900px;
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CardBody = styled.div`
  margin-bottom: 0.75rem;
`;

const FeedThumbnailImg = styled.div<Partial<IOngoingChallenge>>`
  width: 12rem;
  height: 8rem;
  background-image: url(${({ imgSrc }) => imgSrc});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: var(--borders-radius-base);
`;

const FeedThumbnailImgWrapper = styled.div`
  background: var(--colors-brand-200);
  border-radius: var(--borders-radius-base);
  margin: auto 1.5rem auto 0rem;
`;

const ChallengeItem = ({ name, content, imgSrc }: Partial<IOngoingChallenge>) => {
  return (
    <Card style={{ marginBottom: '1rem', display: 'flex', width: '700px', padding: '1.5rem 3rem' }}>
      <FeedThumbnailImgWrapper>
        <FeedThumbnailImg imgSrc={imgSrc} />
      </FeedThumbnailImgWrapper>
      <div>
        <CardHeader>
          <MiniTitle sizeType="xl" textAlign="left">
            {name}
          </MiniTitle>
        </CardHeader>
        <CardBody>
          <Paragraph sizeType="base" textAlign="left">
            {content}
          </Paragraph>
        </CardBody>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button fontSize="var(--fonts-body-sm)">챌린지 참여하기</Button>
        </div>
      </div>
    </Card>
  );
};

// - (Monthly) 휴일 공부 챌린지 (휴일에 깃허브 커밋으로 체크)
// - (Monthly) 1달 10회 답변 챌린지
// - (Monthly) 1달 10회 퇴근 후 공부 챌린지
// - 7일 7회 답변 챌린지
// - 커밋 연속 10회 챌린지

const OngoingChallengeVer3 = () => {
  const MChallengeInfoList = [
    {
      challengeId: 1,
      badge: '뱃지',
      name: '휴일 공부 챌린지',
      content:
        '2월 한 달 동안 휴일에 공부하고 깃허브 커밋을 남겨보세요! 휴일에도 꾸준히 공부해서 실력을 높이고 싶은 분들께 추천 드립니다.',
      imgSrc:
        'https://img.freepik.com/free-vector/web-developers-courses-computer-programming-web-design-script-and-coding-study-computer-science-student-learning-interface-structure-components_335657-2542.jpg?w=740&t=st=1675822241~exp=1675822841~hmac=ce0aa3826eb106830a9e869c1e7bf7723e635a08dfd9de3ed259622788b7e628',
    },
    {
      challengeId: 2,
      badge: '뱃지',
      name: '한달 10회 답변 챌린지',
      content:
        '1달동안 TryCatch에서 10회 답변하며 지식을 나눠보세요! 꾸준한 답변을 남기다보면 본인의 실력도 향상될거예요!',
      imgSrc:
        'https://img.freepik.com/free-vector/question-answer-faq-frequently-asked-questions-concepts-websites-social-networks-business-pages-flat-cartoon-vector-illustration_1150-58780.jpg?w=1060&t=st=1675821254~exp=1675821854~hmac=600143208eecb231204a413442e04c0cefcbf207c4ee1e32d0fa1f3f6230a5e8',
    },
    {
      challengeId: 3,
      badge: '뱃지',
      name: '한달 10회 퇴근 후 공부 챌린지',
      content:
        '자신만의 학습시간을 가지고 싶다면, 한달동안 10회 퇴근 후 학습을 통해 꾸준히 실력을 향상시켜보세요!',
      imgSrc:
        'https://img.freepik.com/free-vector/hand-drawn-illustration-business-planning_52683-76702.jpg?w=826&t=st=1675821325~exp=1675821925~hmac=526dc6fb2c3aef58ee1993af746ce914a4eceffc75889b69cc1b9ea31522a072',
    },
    {
      challengeId: 4,
      badge: '뱃지',
      name: '7일 7회 답변 챌린지',
      content: '일주일 동안 7회의 답변을 남겨보세요! 당신의 지식 나눔이 질문자에 큰 도움이 됩니다!',
      imgSrc:
        'https://img.freepik.com/free-vector/students-learning-foreign-language-with-vocabulary_74855-11070.jpg?w=1060&t=st=1675821589~exp=1675822189~hmac=8c12dd0bb40a127e2b80f6a21da79e05715c29c74fad1d18b4e0a1b0af3a20da',
    },
    {
      challengeId: 5,
      badge: '뱃지',
      name: '커밋 연속 10회 챌린지',
      content: '꾸준히 공부하는 습관을 기르기 위한 첫 시작! 깃허브에 잔디를 10회 연속 심어보세요!',
      imgSrc: 'https://tbc.imgdl.xcache.kinxcdn.com/cdn001/20180227/425593167_main1.jpg',
    },
  ];

  return (
    <StyledWrapper>
      {MChallengeInfoList.map((challengeInfo) => {
        return <ChallengeItem key={`${challengeInfo.challengeId}`} {...challengeInfo} />;
      })}
    </StyledWrapper>
  );
};

export default OngoingChallengeVer3;
