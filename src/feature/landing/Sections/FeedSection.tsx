import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../../components';
import { IconFeed } from '../../../components/icons/Icons';
import { IFeedListProps } from '../../feed/IFeed';
import { IFeedSearch } from '../../../interface/feed';
import { getFeedSearchList } from '../../../apis/feed/feed';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import FeedCard from './FeedCard';

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

const ThirdSection = styled.section`
  align-self: flex-end;
  height: 110vh;
  width: 100%;

  visibility: hidden;

  &.active {
    visibility: visible;
    animation: ${fadeUp} 1s;
  }

  .description {
    visibility: hidden;

    &.active {
      visibility: visible;
      animation: ${fadeUp} 1s;
    }
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
  const { ref, inView } = useInView();
  const { ref: descRef, inView: descInView } = useInView();

  const { data: feeds, isLoading } = useQuery<IFeedListProps, AxiosError>(
    ['landing', 'feed'],
    () => {
      const params: IFeedSearch = {
        advanced: false,
        page: 0,
        publishDateEnd: null,
        publishDateStart: null,
        query: '',
        size: 4,
        sort: 'date',
        subscribe: false,
      };
      return getFeedSearchList(params);
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ThirdSection ref={ref} className={inView ? 'active' : ''}>
      <div ref={descRef} className={`description ${descInView ? 'active' : ''}`}>
        <div>
          <SubTitle textAlign="left" display="inline-flex" className="title">
            <IconFeed />
            &nbsp;Feed
          </SubTitle>
          <SubTitle textAlign="right">기술 블로그를 한눈에 보고 싶은데...</SubTitle>
        </div>
        <MiniTitle sizeType="xl" textAlign="right">
          <span className="emph">피드</span> 탭을 이용해보세요
        </MiniTitle>
        <Paragraph sizeType="lg" textAlign="right">
          다양한 기업의 블로그를 보며 쉽게 기술 트렌드를 파악할 수 있어요
        </Paragraph>
      </div>
      <div className="card-container">
        {feeds?.feedList.map((feedItem, index) => (
          <FeedCard key={feedItem.feedId} {...feedItem} delay={(index + 1) * 250} />
        ))}
      </div>
      <div className="button-wrapper">
        <Button onClick={() => navigate('/feed')}>피드 둘러보기</Button>
      </div>
    </ThirdSection>
  );
};

export default FeedSection;
