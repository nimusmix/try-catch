import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../../components';
import QnaCard from './QnaCard';
import { IconQuestion } from '../../../components/icons/Icons';
import TagList from '../tags-loop-slider/TagList';
import { getPopularQuestion } from '../../../apis/qna/qna';
import elapsedTime from '../../../utils/elapsed-time';

const rotate = keyframes`
  0% {transform: rotate(0deg);}
  25% {transform: rotate(8deg);}
  45% {transform: rotate(-8deg);}
  60% {transform: rotate(5deg);}
  80% {transform: rotate(-5deg);}
  90% {transform: rotate(3deg);}
  95% {transform: rotate(-3deg);}
  100% {transform: rotate(0deg);}
`;

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

const SecondSection = styled.section`
  align-self: flex-end;
  height: 140vh;
  width: 100%;
  visibility: hidden;

  &.active {
    visibility: visible;
    animation: ${fadeUp} 1.5s;
  }

  .description {
    margin-bottom: 2rem;

    & > div > div:first-child {
      display: flex;

      h2:first-child {
        margin-right: 0.5rem;
      }
    }

    & .question-mark {
      animation: ${rotate} 2s infinite;
    }

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

  .tag-wrapper {
    display: flex;

    .description {
      flex: 1;
      align-self: center;
    }
  }
`;
const QnASection = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const { data: questions } = useQuery(
    ['landing', 'question'],
    getPopularQuestion({ size: 3, category: 'DEV' })
  );

  return (
    <SecondSection ref={ref} className={inView ? 'active' : ''}>
      <div className="description">
        <div>
          <div>
            <SubTitle textAlign="left">혼자 개발하다 막히셨나요</SubTitle>
            <SubTitle textAlign="left" className="question-mark">
              ?
            </SubTitle>
          </div>

          <SubTitle textAlign="right" display="inline-flex" className="title">
            <IconQuestion />
            &nbsp;Q&A
          </SubTitle>
        </div>
        <div>
          <MiniTitle sizeType="xl" textAlign="left">
            <span className="emph">Q&A</span> 탭을 이용해보세요
          </MiniTitle>
          <Paragraph sizeType="lg" textAlign="left">
            좋은 질문과 답변으로 지식을 쌓을 수 있어요
          </Paragraph>
        </div>
      </div>
      <div className="card-container">
        {questions?.map((question) => (
          <QnaCard
            key={question.questionId}
            title={question.title}
            timestamp={elapsedTime(question.timestamp)}
            content={question.content}
            tags={question.tags}
            questionId={question.questionId}
          />
        ))}
      </div>
      <div className="tag-wrapper">
        <TagList />
        <div className="description">
          <MiniTitle sizeType="3xl" textAlign="right">
            다양한 태그를 활용해서
            <br />
            검색해보세요!
          </MiniTitle>
        </div>
      </div>
      <div className="button-wrapper">
        <Button onClick={() => navigate('/question')}>Q&A 둘러보기</Button>
      </div>
    </SecondSection>
  );
};

export default QnASection;
