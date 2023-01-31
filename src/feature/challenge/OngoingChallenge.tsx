import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const Table = styled.table`
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 1160px;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
`;

const Thead = styled.thead`
  font-weight: bold;
  color: #fff;
  background: var(--colors-brand-500);
`;

const Th = styled.th`
  text-align: center;
  padding: 1em 0.5em;
  vertical-align: middle;
`;

const Td = styled.td`
  padding: 1em 2em;
  vertical-align: middle;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background: ${({ theme }) => theme.bgColor};
`;

const TdRight = styled(Td)`
  text-align: center;
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
  margin: auto;
`;

const ChallengeItem = ({
  badge,
  name,
  content,
  progress,
  successNumber,
  challengeId,
}: IOngoingChallenge) => {
  /* TODO 뱃지 추후 변경 예정 */
  return (
    <tr>
      <Td>
        <Badge>{badge}</Badge>
      </Td>
      <Td>
        <Link to={`${challengeId}`}>
          <strong>{name}</strong>
          <br />
          {content}
        </Link>
      </Td>
      <Td>
        <ProgressBar process={progress} />
      </Td>
      <TdRight>{successNumber}</TdRight>
    </tr>
  );
};

const OngoingChallenge = () => {
  const MChallengeInfoList = [
    {
      challengeId: 1,
      badge: '뱃지',
      name: '커밋 챌린지',
      content:
        '30일 중 20일 커밋하기등등 챌린지에 대한 설명이 들어갈 자리입니다. TryCatch 화이팅 Aja Aja ',
      progress: 20,
      successNumber: 1504,
    },
    {
      challengeId: 2,
      badge: '뱃지',
      name: '커밋 챌린지',
      content: '30일 중 20일 커밋하기',
      progress: 50,
      successNumber: 1504,
    },
    {
      challengeId: 3,
      badge: '뱃지',
      name: '커밋 챌린지',
      content:
        'Baby, got me looking so crazy 빠져버리는 daydream Got me feeling you 너도 말해줄래 누가 내게 뭐라든',
      progress: 20,
      successNumber: 1504,
    },
    {
      challengeId: 4,
      badge: '뱃지',
      name: '커밋 챌린지',
      content:
        '훌쩍 커버렸어 함께한 기억처럼 널 보는 내 마음은 어느새 여름 지나 가을 기다렸지 all this time',
      progress: 60,
      successNumber: 1504,
    },
    {
      challengeId: 5,
      badge: '뱃지',
      name: '커밋 챌린지',
      content:
        '아무 걱정도 하지는 마 나에게 다 맡겨 봐  지금 이 순간이 다시 넘겨볼 수 있는 한 페이지가 될 수 있게',
      progress: 80,
      successNumber: 1504,
    },
  ];

  return (
    <Table>
      <Thead>
        <tr>
          <Th>뱃지</Th>
          <Th style={{ width: '400px' }}>챌린지</Th>
          <Th>진행도</Th>
          <Th>달성한 사람수</Th>
        </tr>
      </Thead>
      <tbody>
        {MChallengeInfoList.map((challengeInfo) => {
          return <ChallengeItem key={challengeInfo.challengeId} {...challengeInfo} />;
        })}
      </tbody>
    </Table>
  );
};

export default OngoingChallenge;
