import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../../components';
import FERoadmap from './FERoadmap';
import BERoadmap from './BERoadmap';

const ContentWrapper = styled.div`
  margin-top: 3rem;
  margin-left: 2rem;
  width: 942px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RoadmapMain = () => {
  const [activeBE, setActiveBE] = useState(false);
  const onClick = (bool: boolean) => {
    setActiveBE(bool);
  };

  return (
    <ContentWrapper>
      <ButtonWrapper>
        <div>
          <Button
            margin="0 1rem 0 0"
            borderRadius="var(--borders-radius-lg)"
            designType={activeBE ? 'blueEmpty' : 'blueFill'}
            onClick={() => onClick(false)}
          >
            프론트엔드
          </Button>
          <Button
            borderRadius="var(--borders-radius-lg)"
            designType={activeBE ? 'blueFill' : 'blueEmpty'}
            onClick={() => onClick(true)}
          >
            백엔드
          </Button>
        </div>
        <Link to="form">
          <Button borderRadius="var(--borders-radius-lg)">로드맵 생성</Button>
        </Link>
      </ButtonWrapper>
      {activeBE ? <BERoadmap /> : <FERoadmap />}
    </ContentWrapper>
  );
};

export default RoadmapMain;
