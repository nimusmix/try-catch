import styled from 'styled-components';
import { Button, Card, MiniTitle, Paragraph } from '../../components';
import { IChallengeItem } from '../../interface/challenge';

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CardBody = styled.div`
  margin-bottom: 0.75rem;
`;

const FeedThumbnailImg = styled.div<Partial<IChallengeItem>>`
  width: 270px;
  height: 270px;
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

const StyledCard = styled(Card)`
  cursor: default;
  margin: 0 1.7rem 1rem 0rem;
  display: flex;
  width: 540px;
  padding: 0rem;
  &:hover {
    box-shadow: ${({ theme: { isDark } }) =>
      isDark
        ? 'rgba(59, 130, 246, 0.16) 0px 3px 6px, rgba(59, 130, 246, 0.23) 0px 3px 6px'
        : 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'};
    translate: 1px 1px;
  }
`;

export const ChallengeItem = ({ title, content, imgSrc }: Partial<IChallengeItem>) => {
  return (
    <StyledCard>
      <FeedThumbnailImgWrapper>
        <FeedThumbnailImg imgSrc={imgSrc} />
      </FeedThumbnailImgWrapper>
      <div
        style={{
          padding: '35px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        {/* <div>Monthly</div> */}
        <CardHeader>
          <MiniTitle sizeType="2xl" textAlign="left">
            {title}
          </MiniTitle>
        </CardHeader>
        <div>
          <CardBody>
            <Paragraph sizeType="base" textAlign="left">
              {content}
            </Paragraph>
          </CardBody>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button fontSize="var(--fonts-body-sm)">챌린지 도전</Button>
          </div>
        </div>
      </div>
    </StyledCard>
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
      title: '휴일 공부 챌린지',
      content:
        '2월 한 달 동안 휴일에 공부하고 깃허브 커밋을 남겨보세요! 휴일에도 꾸준히 공부해서 실력을 높이고 싶은 분들께 추천 드립니다.',
      imgSrc:
        'https://img.freepik.com/free-photo/reminder-notification-with-bell-pencil-calendar-event-planner-new-note-icon-3d-illustration-purple-background_56104-1773.jpg',
    },
    {
      challengeId: 2,
      badge: '뱃지',
      title: '한달 10회 답변 챌린지',
      content:
        '1달동안 TryCatch에서 10회 답변하며 지식을 나눠보세요! 꾸준한 답변을 남기다보면 본인의 실력도 향상될거예요!',
      imgSrc: 'https://img.freepik.com/free-psd/3d-space-rocket-with-smoke_23-2148938939.jpg',
    },
    {
      challengeId: 3,
      badge: '뱃지',
      title: '한달 10회 퇴근 후 공부 챌린지',
      content:
        '자신만의 학습시간을 가지고 싶다면, 한달동안 10회 퇴근 후 학습을 통해 꾸준히 실력을 향상시켜보세요!',
      imgSrc:
        'https://img.freepik.com/free-psd/3d-dart-board-target-with-bullseye-arrow_23-2148938923.jpg',
    },
    {
      challengeId: 4,
      badge: '뱃지',
      title: '7일 7회 답변 챌린지',
      content: '일주일 동안 7회의 답변을 남겨보세요! 당신의 지식 나눔이 질문자에 큰 도움이 됩니다!',
      imgSrc:
        'https://img.freepik.com/free-psd/3d-illustration-tired-man-walking-away-from-many-message_1150-65960.jpg',
    },
    {
      challengeId: 5,
      badge: '뱃지',
      title: '커밋 연속 10회 챌린지',
      content: '꾸준히 공부하는 습관을 기르기 위한 첫 시작! 깃허브에 잔디를 10회 연속 심어보세요!',
      imgSrc:
        'https://img.freepik.com/free-photo/purple-calendar-clock-icon-3d-reminder-notification-concept-website-ui-purple-background-3d-rendering-illustration_56104-1317.jpg',
    },
  ];

  return (
    <Wrapper>
      {MChallengeInfoList.map((challengeInfo) => {
        return <ChallengeItem key={`${challengeInfo.challengeId}`} {...challengeInfo} />;
      })}
    </Wrapper>
  );
};

export default ChallengeAll;
