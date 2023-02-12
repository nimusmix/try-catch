export interface IChallengeItem {
  challengeId: number; // 챌린지 id
  title: string; // 챌린지 명
  content: string; // 챌린지 내용
  imgSrc: string; // 챌린지 뱃지 이미지 경로
  state: 'BEFORE' | 'ONGOING' | 'SUCCESS' | 'FAIL'; // 챌린지 참여 및 성공 상태
  progress: number; // 진행도 (100% 기준)
  startFrom: number; // 챌린지 시작 timestamp
  endAt: number; // 챌린지 끝 timestamp
  earnedAt: number; // 챌린지 성공 timestamp
}

export interface IChallengeAllProps {
  challengeList: Array<IChallengeItem>;
}
