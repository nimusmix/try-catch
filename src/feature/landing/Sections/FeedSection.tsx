import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../../components';
import { IconFeed } from '../../../components/icons/Icons';
import { IFeedListProps, IFeedSearch } from '../../../interface/feed';
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
    min-height: 383px;
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
          <SubTitle textAlign="right">?????? ???????????? ????????? ?????? ?????????...</SubTitle>
        </div>
        <MiniTitle sizeType="xl" textAlign="right">
          <span className="emph">??????</span> ?????? ??????????????????
        </MiniTitle>
        <Paragraph sizeType="lg" textAlign="right">
          ????????? ????????? ???????????? ?????? ?????? ?????? ???????????? ????????? ??? ?????????
        </Paragraph>
      </div>

      <div className="card-container">
        {feeds?.feedList.map((feedItem, index) => (
          <FeedCard key={feedItem.feedId} {...feedItem} delay={(index + 1) * 250} />
        ))}
      </div>
      <div className="button-wrapper">
        <Button onClick={() => navigate('/feed')}>?????? ????????????</Button>
      </div>
    </ThirdSection>
  );
};

export default FeedSection;
