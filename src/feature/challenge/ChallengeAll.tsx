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
  width: 350px;
  height: 350px;
  background-image: url(${({ imgSrc }) => imgSrc});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: var(--borders-radius-base) 0 0 var(--borders-radius-base);
`;

const FeedThumbnailImgWrapper = styled.div`
  background: var(--colors-brand-200);
  border-radius: var(--borders-radius-base);
`;

const ChallengeItem = ({ name, content, imgSrc }: Partial<IOngoingChallenge>) => {
  return (
    <Card style={{ marginBottom: '1rem', display: 'flex', width: '700px', padding: '0rem' }}>
      <FeedThumbnailImgWrapper>
        <FeedThumbnailImg imgSrc={imgSrc} />
      </FeedThumbnailImgWrapper>
      <div style={{ padding: '20px' }}>
        <CardHeader>
          <MiniTitle sizeType="xl" textAlign="left">
            {name}
          </MiniTitle>
        </CardHeader>
        <div>
          <CardBody>
            <Paragraph sizeType="base" textAlign="left">
              {content}
            </Paragraph>
          </CardBody>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button fontSize="var(--fonts-body-sm)">챌린지 참여하기</Button>
          </div>
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

const ChallengeAll = () => {
  const MChallengeInfoList = [
    {
      challengeId: 1,
      badge: '뱃지',
      name: '휴일 공부 챌린지',
      content:
        '2월 한 달 동안 휴일에 공부하고 깃허브 커밋을 남겨보세요! 휴일에도 꾸준히 공부해서 실력을 높이고 싶은 분들께 추천 드립니다.',
      imgSrc:
        'https://img.freepik.com/free-photo/reminder-notification-with-bell-pencil-calendar-event-planner-new-note-icon-3d-illustration-purple-background_56104-1773.jpg?w=900&t=st=1675841658~exp=1675842258~hmac=d90b7886f975cfcda64c3c2e2aa71a3338f857e19a7b8a2adcf6d3e7467b6782',
    },
    {
      challengeId: 2,
      badge: '뱃지',
      name: '한달 10회 답변 챌린지',
      content:
        '1달동안 TryCatch에서 10회 답변하며 지식을 나눠보세요! 꾸준한 답변을 남기다보면 본인의 실력도 향상될거예요!',
      imgSrc:
        'https://img.freepik.com/free-psd/3d-space-rocket-with-smoke_23-2148938939.jpg?w=740&t=st=1675841684~exp=1675842284~hmac=0b7ba0de50578297b9d4b6856ca3aad5e60ab73fcf38471e0c791cfe56403261',
    },
    {
      challengeId: 3,
      badge: '뱃지',
      name: '한달 10회 퇴근 후 공부 챌린지',
      content:
        '자신만의 학습시간을 가지고 싶다면, 한달동안 10회 퇴근 후 학습을 통해 꾸준히 실력을 향상시켜보세요!',
      imgSrc:
        'https://img.freepik.com/free-psd/3d-dart-board-target-with-bullseye-arrow_23-2148938923.jpg?w=740&t=st=1675842329~exp=1675842929~hmac=f45cc6d2af20a8670b4dde947eb3ab01ada091fcf486bbbc8f786d0460d48118',
    },
    {
      challengeId: 4,
      badge: '뱃지',
      name: '7일 7회 답변 챌린지',
      content: '일주일 동안 7회의 답변을 남겨보세요! 당신의 지식 나눔이 질문자에 큰 도움이 됩니다!',
      imgSrc:
        'https://img.freepik.com/free-psd/3d-illustration-tired-man-walking-away-from-many-message_1150-65960.jpg?w=740&t=st=1675842496~exp=1675843096~hmac=5ef0270d45d23bb9bcc2addc23b6b7eb7bb4acd3f46f9667a15220aca724a21d',
    },
    {
      challengeId: 5,
      badge: '뱃지',
      name: '커밋 연속 10회 챌린지',
      content: '꾸준히 공부하는 습관을 기르기 위한 첫 시작! 깃허브에 잔디를 10회 연속 심어보세요!',
      imgSrc:
        'https://img.freepik.com/free-photo/purple-calendar-clock-icon-3d-reminder-notification-concept-website-ui-purple-background-3d-rendering-illustration_56104-1317.jpg?w=826&t=st=1675841555~exp=1675842155~hmac=eb7d226570361c59c3e4d3260447d424d38c89596c1c56c7813ef4a215017374',
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

export default ChallengeAll;
