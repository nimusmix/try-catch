import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../../components';

const FirstSection = styled.section`
  align-self: flex-start;
  height: 80vh;
  width: 100%;

  & > div {
    display: flex;
    margin-bottom: 1rem;
  }

  .description {
    flex: 1;
    h2 {
      margin-bottom: 0.1rem;
    }
    h3 {
      margin-bottom: 0.8rem;
    }

    p {
      margin-bottom: 0.4rem;
    }
  }

  .image {
    flex: 1;
  }
`;
const IntroSection = () => {
  const navigate = useNavigate();
  return (
    <FirstSection>
      <div>
        <div className="description">
          <SubTitle textAlign="left">이제는 혼자 개발하지 말고,</SubTitle>
          <MiniTitle sizeType="3xl" textAlign="left">
            트라이캐치와 함께 하세요!
          </MiniTitle>
          <Paragraph sizeType="lg">
            트라이캐치는 개인 추천~~ blah blah blah blah <br /> 개발자 커뮤니티 입니다.
          </Paragraph>
          <Paragraph sizeType="lg">
            다양한 기업의 개발 블로그 부터 Q&A 까지 <br /> 양질의 다양한 컨텐츠와 함께 공부를
            이어가세요.
          </Paragraph>
        </div>
        <div className="image">그림</div>
      </div>
      <div className="button-wrapper">
        <Button onClick={() => navigate('/home')} width="120px">
          둘러보기
        </Button>
      </div>
    </FirstSection>
  );
};

export default IntroSection;
