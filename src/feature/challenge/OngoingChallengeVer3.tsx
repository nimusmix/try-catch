import styled from 'styled-components';
import React from 'react';
import { Button, MiniTitle, Paragraph, Card } from '../../components';

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

const FeedThumbnailImg = styled.div<Partial<IOngoingChallenge>>`
  width: 100%;
  height: 322px;
  background-image: url(${({ imgSrc }) => imgSrc});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: var(--borders-radius-base) var(--borders-radius-base) 0 0;
`;

const FeedThumbnailImgWrapper = styled.div`
  background: var(--colors-brand-200);
  border-radius: var(--borders-radius-base) var(--borders-radius-base) 0 0;
  height: 322px;
`;

const StyleCard = styled(Card)`
  margin-right: 2rem;
  border: none;
  box-shadow: ${({ theme: { isDark } }) =>
    isDark
      ? 'rgb(59 130 246 / 6%) 0 0 0 0.05rem, rgb(39 110 226 / 4%) 0 0 1.25rem'
      : 'rgb(8 60 130 / 6%) 0 0 0 0.05rem, rgb(30 34 40 / 4%) 0 0 1.25rem'};

  cursor: pointer;
  transition: box-shadow 0.5s ease, translate 0.5s ease;
  &:hover {
    box-shadow: ${({ theme: { isDark } }) =>
      isDark
        ? 'var(--shadows-brand)'
        : 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'};
    translate: 1px 1px;
  }
`;

const ChallengeItem = ({ name, content, imgSrc }: Partial<IOngoingChallenge>) => {
  return (
    <StyleCard
      style={{
        marginBottom: '1rem',
        width: '322px',
        height: '448px',
        padding: '0rem',
      }}
    >
      <FeedThumbnailImgWrapper>
        <FeedThumbnailImg imgSrc={imgSrc} />
      </FeedThumbnailImgWrapper>
      <div style={{ padding: '18px' }}>
        <CardHeader>
          <MiniTitle sizeType="xl" textAlign="left">
            {name}
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
      name: '휴일 공부 챌린지',
      content: '2월 한 달 동안 휴일에 깃허브 커밋하기',
      imgSrc:
        'https://img.freepik.com/free-photo/reminder-notification-with-bell-pencil-calendar-event-planner-new-note-icon-3d-illustration-purple-background_56104-1773.jpg?w=900&t=st=1675841658~exp=1675842258~hmac=d90b7886f975cfcda64c3c2e2aa71a3338f857e19a7b8a2adcf6d3e7467b6782',
    },
    {
      challengeId: 2,
      badge: '뱃지',
      name: '답변 챌린지',
      content: '1달동안 TryCatch에서 10회 답변하기',
      imgSrc:
        'https://img.freepik.com/free-psd/3d-space-rocket-with-smoke_23-2148938939.jpg?w=740&t=st=1675841684~exp=1675842284~hmac=0b7ba0de50578297b9d4b6856ca3aad5e60ab73fcf38471e0c791cfe56403261',
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
