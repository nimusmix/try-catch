import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../../components';
import QnaCard from './QnaCard';
import { IconQuestion } from '../../../components/icons/Icons';

const SecondSection = styled.section`
  align-self: flex-end;
  height: 80vh;
  width: 100%;

  .description {
    margin-bottom: 2rem;
    h2 {
      margin-bottom: 0.5rem;
    }

    h3 {
      margin-bottom: 0.1rem;
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
  }
`;
const QnASection = () => {
  const navigate = useNavigate();
  return (
    <SecondSection>
      <div className="description">
        <div>
          <SubTitle textAlign="left">혼자 개발하다 막히셨나요?</SubTitle>
          <SubTitle textAlign="right" display="inline-flex">
            <IconQuestion />
            &nbsp;Q&A
          </SubTitle>
        </div>
        <div>
          <MiniTitle sizeType="xl" textAlign="left">
            Q&A 탭을 이용해보세요
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
          tags={[
            { id: 1, tagName: 'react' },
            { id: 2, tagName: 'react-hook-form' },
          ]}
        />
        <QnaCard
          title="Q&A 제목이 들어올 곳"
          timestamp="1분 전"
          content="내용 요약... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum ex
              optio quidem ullam vitae voluptas"
          tags={[
            { id: 1, tagName: 'react' },
            { id: 2, tagName: 'react-hook-form' },
          ]}
        />
      </div>
      <div className="button-wrapper">
        <Button onClick={() => navigate('/question')}>더 보기</Button>
      </div>
    </SecondSection>
  );
};

export default QnASection;
