import styled from 'styled-components';
import { Button, Div, Paragraph } from '../../components';

interface IAnswerProps {
  answerId: number;
  questionId: number;
  author: {
    username: string;
    image?: string;
    company?: string;
    isFollowed: boolean;
  };
  content: string;
  timestamp: number;
  likeCount: number;
  isLiked: boolean;
}

const AnswerDiv = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 820px;
  padding: 2rem;
`;

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--borders-radius-round);
`;

const CompanyImg = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 4px;
  margin-left: 0.2rem;
`;

const SubText = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
`;

const FollowButton = styled(Button)``;

const Answer = () => {
  const MAnswer = {
    answerId: 1,
    questionId: 1,
    author: {
      username: '42good',
      image: 'https://avatars.githubusercontent.com/u/109320569?v=4',
      company: 'https://avatars.githubusercontent.com/u/109320569?v=4',
      isFollowed: false,
    },
    content:
      '에러 코드만 봤을 때는 뭐뭐가 설치가 안 된 것 같습니다. node_modules에 블라블라 확인 후 없다면 블라블라 설치해주시면 될 것 같습니다. 이것은 목업 데이터입니다. 데이터 받아오고 팔로우 연결이랑 블라블라 해야 합니다.',
    timestamp: 1974183600,
    likeCount: 21,
    isLiked: false,
  };

  return (
    <AnswerDiv>
      <AuthorWrapper>
        <ProfileImg src={MAnswer.author.image} />
        <UserInfoWrapper>
          <UserInfo>
            <Paragraph sizeType="base">{MAnswer.author.username}</Paragraph>
            <CompanyImg src={MAnswer.author.company} />
          </UserInfo>
          {/* 내가 남긴 댓글일 경우 분기 필요 */}
          <SubText sizeType="xm">
            {MAnswer.author.isFollowed
              ? '현재 팔로우하는 사용자입니다.'
              : '현재 팔로우하지 않는 사용자입니다.'}
          </SubText>
        </UserInfoWrapper>
      </AuthorWrapper>
      {MAnswer.author.isFollowed && <Button>팔로잉</Button>}
      {MAnswer.author.isFollowed || (
        <FollowButton designType="blueEmpty" fontSize="14px">
          팔로우
        </FollowButton>
      )}
    </AnswerDiv>
  );
};

export default Answer;
