import styled from 'styled-components';
import React from 'react';
import { Button, MiniTitle, Paragraph, Card } from '../../components';
import { IChallengeItem } from '../../interface/challenge';

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
  display: flex;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CardBody = styled.div`
  margin-bottom: 0.75rem;
`;

const ThumbnailImg = styled.div<Partial<IChallengeItem>>`
  width: 100%;
  height: 322px;
  background-image: url(${({ imgSrc }) => imgSrc});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: var(--borders-radius-base) var(--borders-radius-base) 0 0;
`;

const ThumbnailImgWrapper = styled.div`
  background: var(--colors-brand-200);
  border-radius: var(--borders-radius-base) var(--borders-radius-base) 0 0;
  height: 322px;
`;

const StyleCard = styled(Card)`
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  width: 322px;
  height: 448px;
  padding: 0rem;
  &:hover {
    box-shadow: ${({ theme: { isDark } }) =>
      isDark
        ? 'rgba(59, 130, 246, 0.16) 0px 3px 6px, rgba(59, 130, 246, 0.23) 0px 3px 6px'
        : 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'};
    translate: 1px 1px;
  }
`;

const ChallengeItem = ({ title, content, imgSrc }: Partial<IChallengeItem>) => {
  return (
    <StyleCard>
      <ThumbnailImgWrapper>
        <ThumbnailImg imgSrc={imgSrc} />
      </ThumbnailImgWrapper>
      <div style={{ padding: '18px' }}>
        <CardHeader>
          <MiniTitle sizeType="xl" textAlign="left">
            {title}
          </MiniTitle>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button designType="blueEmpty" fontSize="var(--fonts-body-sm)">
              참여중
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Paragraph sizeType="base" textAlign="left">
            {content}
          </Paragraph>
        </CardBody>
      </div>
    </StyleCard>
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
      title: '휴일 공부 챌린지',
      content: '2월 한 달 동안 휴일에 깃허브 커밋하기',
      imgSrc:
        'https://img.freepik.com/free-photo/reminder-notification-with-bell-pencil-calendar-event-planner-new-note-icon-3d-illustration-purple-background_56104-1773.jpg',
    },
    {
      challengeId: 2,
      badge: '뱃지',
      title: '답변 챌린지',
      content: '1달동안 TryCatch에서 10회 답변하기',
      imgSrc: 'https://img.freepik.com/free-psd/3d-space-rocket-with-smoke_23-2148938939.jpg',
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
