import styled from 'styled-components';
import ProgressBar from './ProgressBar';

const Td = styled.div`
  padding: 1em 2em;
  vertical-align: middle;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.bgColor};
`;

const TdRight = styled(Td)`
  text-align: center;
`;

const TdCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
`;

interface IOngoingChallenge {
  challengeId: number; // 챌린지 번호
  badge: string; // 획득 뱃지 이름 (img 로고 처럼 가져올 예정)
  name: string; // 챌린지 이름
  content: string; // 챌린지 설명
  progress: number; // 진행률 ( 1 ~ 100 사이 숫자)
  successNumber: number; // 성공한 사람의 수
}

const Badge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--colors-white-100);
  margin: auto 0;
`;

const JoinCount = styled.div`
  width: 1px;
  border-left: 1px solid ${({ theme }) => theme.borderColor};
`;

const ChallengeItem = ({
  badge, // 뱃지 이미지 링크
  name, // 챌린지 명
  content, // 챌린지 설명
  progress, // 진행도
  successNumber, // 성공한 사람수
  challengeId, // 챌린지 Id
}: IOngoingChallenge) => {
  /* TODO 뱃지 추후 변경 예정 */
  return (
    <div style={{ width: '700px' }}>
      <Td style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Badge>{badge}</Badge>
        <div style={{ width: ' 500px' }}>
          <strong>{name}</strong>
          <br />
          {content}
        </div>
      </Td>
      <Td style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ margin: 'auto 0', display: 'flex' }}>
          <TdCenter>진행도</TdCenter>
          <ProgressBar process={progress} />
        </div>
        <JoinCount />
        <div>
          <TdCenter>참여한 사람 수</TdCenter>
          {successNumber}
        </div>
      </Td>
    </div>
  );
};

const H2 = styled.h2`
  margin: 0 0 0.5em;
  font-weight: normal;
`;

const Tabs = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5);
`;

const Tab = styled.div`
  width: 100%;
  color: white;
  overflow: hidden;
  .tab-label {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    background: #2c3e50;
    font-weight: bold;
    cursor: pointer;
    :hover {
      background: #1a252f;
    }
    ::after {
      content: '❯';
      width: 1em;
      height: 1em;
      text-align: center;
      transition: all 0.35s;
    }
  }

  .tab-content {
    max-height: 0;
    padding: 0 1em;
    color: #2c3e50;
    background: white;
    transition: all 0.35s;
  }
  .tab-close {
    display: flex;
    justify-content: flex-end;
    padding: 1em;
    font-size: 0.75em;
    background: #2c3e50;
    cursor: pointer;
    :hover {
      background: #1a252f;
    }
  }

  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }

  input:checked + .tab-label {
    background: #1a252f;
    ::after {
      transform: rotate(90deg);
    }
  }
  input:checked ~ .tab-content {
    max-height: 100vh;
    padding: 1em;
  }
`;

const StyledWrapper = styled.section`
  .row {
    display: flex;
    .col {
      flex: 1;
      max-width: 900px;
    }
  }
`;

// - (Monthly) 휴일 공부 챌린지 (휴일에 깃허브 커밋으로 체크)
// - (Monthly) 1달 10회 답변 챌린지
// - (Monthly) 1달 10회 퇴근 후 공부 챌린지
// - 7일 7회 답변 챌린지
// - 커밋 연속 10회 챌린지

const OngoingChallengeVer2 = () => {
  const MChallengeInfoList = [
    {
      challengeId: 1,
      badge: '뱃지',
      name: '휴일 공부 챌린지',
      content:
        '2월 한 달 동안 휴일에 공부하고 깃허브 커밋을 남겨보세요! 휴일에도 꾸준히 공부해서 실력을 높이고 싶은 분들께 추천 드립니다. TryCatch 화이팅!',
      progress: 20,
      successNumber: 1504,
    },
    {
      challengeId: 2,
      badge: '뱃지',
      name: '한달 10회 답변 챌린지',
      content: '목표: 1달동안 10회 답변하면 뱃지를 획득할 수 있습니다.',
      progress: 50,
      successNumber: 1504,
    },
    {
      challengeId: 3,
      badge: '뱃지',
      name: '한달 10회 퇴근 후 공부 챌린지',
      content:
        'Baby, got me looking so crazy 빠져버리는 daydream Got me feeling you 너도 말해줄래 누가 내게 뭐라든',
      progress: 20,
      successNumber: 1504,
    },
    {
      challengeId: 4,
      badge: '뱃지',
      name: '7일 7회 답변 챌린지',
      content:
        '훌쩍 커버렸어 함께한 기억처럼 널 보는 내 마음은 어느새 여름 지나 가을 기다렸지 all this time',
      progress: 60,
      successNumber: 1504,
    },
    {
      challengeId: 5,
      badge: '뱃지',
      name: '커밋 연속 10회 챌린지',
      content:
        '아무 걱정도 하지는 마 나에게 다 맡겨 봐  지금 이 순간이 다시 넘겨볼 수 있는 한 페이지가 될 수 있게',
      progress: 80,
      successNumber: 1504,
    },
  ];

  return (
    <StyledWrapper>
      <div className="row">
        <div className="col">
          <H2>챌린지 리스트 UI 확인</H2>
          <Tabs>
            {MChallengeInfoList.map((challengeInfo) => {
              return (
                <Tab key={challengeInfo.challengeId}>
                  <input type="checkbox" id={`${challengeInfo.challengeId}`} />
                  <label className="tab-label" htmlFor={`${challengeInfo.challengeId}`}>
                    {challengeInfo.name}
                  </label>
                  <div className="tab-content">
                    <ChallengeItem {...challengeInfo} />
                  </div>
                </Tab>
              );
            })}
          </Tabs>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default OngoingChallengeVer2;
