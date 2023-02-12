import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';
import { Button } from '../../components';
import FERoadmap from './FERoadmap';
import BERoadmap from './BERoadmap';
import { isLoggedInState, toastState } from '../../recoil';
import { getName } from '../../apis/auth/auth';
import { getRoadmapStatus } from '../../apis/roadmap/roadmap';

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

  const { data: userName } = useQuery<string>(['userName'], () => getName());
  const { data: haveRoadmap } = useQuery<boolean>(['roadmapStatus', userName], () =>
    getRoadmapStatus()
  );
  const createdRoadmapHandler = () => {
    if (!isLoggedIn) {
      setToast({ type: 'negative', message: '로그인 후 이용하실 수 있어요', isVisible: true });
    } else if (haveRoadmap) {
      navi(`${userName}`);
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
          내 로드맵
        </Button>
      </ButtonWrapper>
      {activeBE ? <BERoadmap /> : <FERoadmap />}
    </ContentWrapper>
  );
};

export default RoadmapMain;
