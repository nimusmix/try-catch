import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../../components';
import { IconChallenge } from '../../../components/icons/Icons';
import { ChallengeItem } from '../../challenge/ChallengeAll';
import { IChallengeItem } from '../../../interface/challenge';
import { getChallengeList } from '../../../apis/challenge/challenge';

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
    justify-content: space-between;
    margin-bottom: 1rem;
    min-height: 270px;

    & > div {
      margin: 0;
    }
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
  const { data: challengeList, isLoading } = useQuery<Array<IChallengeItem>>(
    ['challengeList'] as const,
    getChallengeList
  );

  return (
    <FourthSection ref={ref} className={inView ? 'active' : ''}>
      <div className="description">
        <div>
          <SubTitle textAlign="left">??????????????? ???????????? ????????? ??????????????????</SubTitle>
          <SubTitle textAlign="right" display="inline-flex" className="title">
            <IconChallenge />
            &nbsp;?????????
          </SubTitle>
        </div>
        <div>
          <MiniTitle sizeType="xl" textAlign="left">
            <span className="emph">?????????</span> ?????? ??????????????????
          </MiniTitle>
          <Paragraph sizeType="lg" textAlign="left">
            ????????? ??????????????? ?????? ?????? ????????? ?????? ??? ?????????
          </Paragraph>
        </div>
      </div>
      <div className="card-container">
        {challengeList &&
          challengeList.map((challengeInfo) => {
            return <ChallengeItem key={`${challengeInfo.challengeId}`} {...challengeInfo} />;
          })}
      </div>
      <div className="button-wrapper">
        <Button onClick={() => navigate('/challenges')}>????????? ????????????</Button>
      </div>
    </FourthSection>
  );
};

export default ChallengeSection;
