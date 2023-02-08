export interface IChallengeItem {
  challengeId: number; // 챌린지 id
  title: string; // 챌린지 명
  content: string; // 챌린지 내용
  imgSrc: string; // 챌린지 뱃지 이미지 경로
  isJoined: boolean; // 챌린지 참여 여부
  isSucceed: boolean; // 챌린지 성공 여부
  progress: number; // 진행도 (100% 기준)
}
