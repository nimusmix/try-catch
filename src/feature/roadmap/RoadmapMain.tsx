import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Button } from '../../components';
import FERoadmap from './FERoadmap';
import BERoadmap from './BERoadmap';
import { isLoggedInState, toastState } from '../../recoil';

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
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [toast, setToast] = useRecoilState(toastState);
  const navi = useNavigate();

  const createdRoadmapHandler = () => {
    if (!isLoggedIn) {
      setToast({ type: 'negative', message: '로그인 후 이용하실 수 있습니다.', isVisible: true });
    } else {
      navi('form');
    }
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
        <Button borderRadius="var(--borders-radius-lg)" onClick={createdRoadmapHandler}>
          로드맵 생성
        </Button>
      </ButtonWrapper>
      {activeBE ? <BERoadmap /> : <FERoadmap />}
    </ContentWrapper>
  );
};

export default RoadmapMain;
