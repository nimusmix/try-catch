import styled, { keyframes } from 'styled-components';
import React from 'react';
import { Button, MiniTitle, Paragraph, Card } from '../../components';
import { IChallengeAllProps, IChallengeItem } from '../../interface/challenge';
import OngoingChallengeCard, { IOngoingChallengeCardProps } from './OngoingChallegeCard';

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
  cursor: default;
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
  const category = title ? title.split(' ') : '';

  return (
    <StyleCard>
      <ThumbnailImgWrapper>
        <ThumbnailImg imgSrc={imgSrc} />
      </ThumbnailImgWrapper>
      <div style={{ padding: '18px' }}>
        <CardHeader>
          <MiniTitle sizeType="xl" textAlign="left">
            {`${category[category.length - 2]} 챌린지`}
          </MiniTitle>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button designType="blueEmpty" fontSize="var(--fonts-body-sm)">
              참여중
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Paragraph sizeType="base" textAlign="left">
            {title}
          </Paragraph>
        </CardBody>
      </div>
    </StyleCard>
  );
};

const ThumbnailImgWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  background: var(--colors-brand-100);
  border-radius: var(--borders-radius-base) var(--borders-radius-base) 0 0;
  height: 322px;
`;

const ChallengeItem2 = ({ title, content, progress }: Partial<IChallengeItem>) => {
  return (
    <StyleCard>
      <ThumbnailImgWrapper2>
        <OngoingChallengeCard progress={progress} />
      </ThumbnailImgWrapper2>
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
            {title}
          </Paragraph>
        </CardBody>
      </div>
    </StyleCard>
  );
};

const NonOngoing = () => {
  /** TODO 진행중인 챌린지가 없을 때 만들기 */
  return (
    <div style={{ padding: ' 0px' }}>
      <CardHeader>
        <MiniTitle sizeType="xl" textAlign="left">
          진행중인 챌린지가 없어요.. ㅠ
        </MiniTitle>
      </CardHeader>
    </div>
  );
};

// - (Monthly) 휴일 공부 챌린지 (휴일에 깃허브 커밋으로 체크)
// - (Monthly) 1달 10회 답변 챌린지
// - (Monthly) 1달 10회 퇴근 후 공부 챌린지
// - 7일 7회 답변 챌린지
// - 커밋 연속 10회 챌린지

const anim = (progressCircle: number) => keyframes`
    100% {
      stroke-dashoffset:  ${progressCircle};
    }
`;

const Flip = styled.div<Partial<IOngoingChallengeCardProps>>`
  width: 322px;
  height: 448px;
  position: relative;
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  :hover .card {
    transform: rotateY(180deg);
  }

  :hover circle {
    animation: ${({ progressCircle }) => anim(progressCircle || 450)} 1.2s linear forwards;
  }
`;

const FlipInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: 0.4s;
  transform-style: preserve-3d;
`;

const FrontBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Back = styled(FrontBack)`
  transform: rotateY(180deg);
`;

const OngoingChallengeVer3 = ({ challengeList }: IChallengeAllProps) => {
  const MChallengeInfoList = [
    {
      challengeId: 1,
      badge: '뱃지',
      title: '휴일 공부 챌린지',
      content: '1달동안 휴일에 깃허브 커밋하기',
      imgSrc:
        'https://img.freepik.com/free-photo/reminder-notification-with-bell-pencil-calendar-event-planner-new-note-icon-3d-illustration-purple-background_56104-1773.jpg',
      progress: 50,
    },
    {
      challengeId: 2,
      badge: '뱃지',
      title: '답변 챌린지',
      content: '1달동안 TryCatch에서 10회 답변하기',
      imgSrc: 'https://img.freepik.com/free-psd/3d-space-rocket-with-smoke_23-2148938939.jpg',
      progress: 0,
    },
  ];

  const onGoingChallengeList = challengeList.filter((item) => item.state === 'ONGOING');

  return (
    <div style={{ margin: '0 2rem' }}>
      <MiniTitle sizeType="2xl" textAlign="left" padding="0rem 0rem 2rem 0rem" fontWeight="600">
        진행 중인 챌린지
      </MiniTitle>

      <StyledWrapper>
        {onGoingChallengeList &&
          onGoingChallengeList.map((challengeInfo) => {
            const progressCircle = 450 * (1 - challengeInfo.progress * 0.01);
            return (
              <Flip key={`${challengeInfo.challengeId}`} progressCircle={progressCircle}>
                <FlipInner className="card">
                  {/* <!-- 앞면 --> */}
                  <FrontBack>
                    <ChallengeItem {...challengeInfo} />
                  </FrontBack>
                  {/* <!-- 뒷면 --> */}
                  <Back>
                    <ChallengeItem2 {...challengeInfo} />
                  </Back>
                </FlipInner>
              </Flip>
            );
          })}
      </StyledWrapper>
      <NonOngoing />
    </div>
  );
};

export default OngoingChallengeVer3;
