import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../../components';
import FeedCard from './FeedCard';
import { IconFeed } from '../../../components/icons/Icons';

const ThirdSection = styled.section`
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
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .button-wrapper {
    display: flex;
    justify-content: flex-start;
  }
`;
const FeedSection = () => {
  const navigate = useNavigate();
  return (
    <ThirdSection>
      <div className="description">
        <div>
          <SubTitle textAlign="left" display="inline-flex">
            <IconFeed />
            &nbsp;Feed
          </SubTitle>
          <SubTitle textAlign="right">기술 블로그를 한눈에 보고싶은데...</SubTitle>
        </div>
        <MiniTitle sizeType="xl" textAlign="right">
          피드 탭을 이용해보세요
        </MiniTitle>
        <Paragraph sizeType="lg" textAlign="right">
          다양한 기업의 블로그를 보며 기술 트렌드 파악을 쉽게 할 수 있어요
        </Paragraph>
      </div>
      <div className="card-container">
        <FeedCard
          title="Feed 제목"
          company="naver"
          content="내용 요약... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum ex
              optio quidem ullam vitae voluptas"
          tags={[
            { id: 1, tagName: 'react' },
            { id: 2, tagName: 'react-hook-form' },
          ]}
        />
        <FeedCard
          title="Feed 제목"
          company="kakao"
          content="내용 요약... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum ex
              optio quidem ullam vitae voluptas"
          tags={[
            { id: 1, tagName: 'react' },
            { id: 2, tagName: 'react-hook-form' },
          ]}
        />
        <FeedCard
          title="Feed 제목"
          company="kakao"
          content="내용 요약... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum ex
              optio quidem ullam vitae voluptas"
          tags={[
            { id: 1, tagName: 'react' },
            { id: 2, tagName: 'react-hook-form' },
          ]}
        />
        <FeedCard
          title="Feed 제목"
          company="daangn"
          content="내용 요약... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error eum ex
              optio quidem ullam vitae voluptas"
          tags={[
            { id: 1, tagName: 'react' },
            { id: 2, tagName: 'react-hook-form' },
          ]}
        />
      </div>
      <div className="button-wrapper">
        <Button onClick={() => navigate('/feed')}>더 보기</Button>
      </div>
    </ThirdSection>
  );
};

export default FeedSection;
