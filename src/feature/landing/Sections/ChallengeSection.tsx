import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../../components';
import { IconChallenge } from '../../../components/icons/Icons';
import { ChallengeItem } from '../../challenge/ChallengeAll';

const fadeUp = keyframes`
  0% {
    filter: alpha(opacity=0);
    opacity: .1;
    transform: translateY(100px);
  }
  100% {
    filter: alpha(opacity=100);
    opacity: 1;
    transform: translateY(0);
  }
`;

const FourthSection = styled.section`
  align-self: flex-end;
  height: 80vh;
  width: 100%;
  visibility: hidden;

  &.active {
    visibility: visible;
    animation: ${fadeUp} 2s;
  }

  .description {
    margin-bottom: 2rem;
    h2 {
      margin-bottom: 0.5rem;
    }

    h3 {
      margin-bottom: 0.1rem;
    }
    .title {
      cursor: pointer;
      transition: color 0.5s ease;
    }

    .title:hover {
      color: var(--colors-brand-500);
      scale: 1.01;
    }
  }
  .description > div:first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .card-container {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
  }
`;
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
];

const ChallengeSection = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  return (
    <FourthSection ref={ref} className={inView ? 'active' : ''}>
      <div className="description">
        <div>
          <SubTitle textAlign="left">도전과제를 달성하며 재밌게 학습해보세요</SubTitle>
          <SubTitle textAlign="right" display="inline-flex" className="title">
            <IconChallenge />
            &nbsp;챌린지
          </SubTitle>
        </div>
        <div>
          <MiniTitle sizeType="xl" textAlign="left">
            <span className="emph">챌린지</span> 탭을 이용해보세요
          </MiniTitle>
          <Paragraph sizeType="lg" textAlign="left">
            다양한 도전과제를 하면서 트라이캐치를 이용해보세요
          </Paragraph>
        </div>
      </div>
      <div className="card-container">
        {MChallengeInfoList.map((challengeInfo) => {
          return <ChallengeItem key={`${challengeInfo.challengeId}`} {...challengeInfo} />;
        })}
      </div>
      <div className="button-wrapper">
        <Button onClick={() => navigate('/question')}>챌린지 둘러보기</Button>
      </div>
    </FourthSection>
  );
};

export default ChallengeSection;
