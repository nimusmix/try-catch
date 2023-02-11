import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../../components';
import QnaCard from './QnaCard';
import { IconChallenge } from '../../../components/icons/Icons';

const FourthSection = styled.section`
  align-self: flex-end;
  height: 80vh;
  width: 100%;

  opacity: 0;
  transition: all 5s ease;

  &.active {
    opacity: 1;
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
            챌린지 탭을 이용해보세요
          </MiniTitle>
          <Paragraph sizeType="lg" textAlign="left">
            좋은 질문과 답변으로 지식을 쌓을 수 있어요
          </Paragraph>
        </div>
      </div>
      <div className="card-container">
        <QnaCard
          title="Q&A 제목이 들어올 곳"
          timestamp="1분 전"
          content="내용 요약... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum ex
              optio quidem ullam vitae voluptas"
          tags={[]}
          questionId={1}
        />
        <QnaCard
          title="Q&A 제목이 들어올 곳"
          timestamp="1분 전"
          content="내용 요약... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum ex
              optio quidem ullam vitae voluptas"
          tags={[]}
          questionId={2}
        />
      </div>
      <div className="button-wrapper">
        <Button onClick={() => navigate('/question')}>더 보기</Button>
      </div>
    </FourthSection>
  );
};

export default ChallengeSection;
