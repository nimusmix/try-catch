import styled from 'styled-components';
import { IconLikeEmpty, IconLikeFill } from '../../components/icons/Icons';
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

const UpperWraaper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.725rem;
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

const Line = styled.div`
  margin-top: 1rem;
  margin-bottom: 1.6rem;
  border-bottom: 0.8px ${({ theme }) => theme.borderColor} solid;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-left: auto;
  svg {
    margin-right: 0.2rem;
    color: ${({ theme }) => theme.textColor100};
  }
  p {
    margin-top: 0.1rem;
  }
`;

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
    isLiked: true,
  };

  return (
    <AnswerDiv>
      <UpperWraaper>
        <AuthorWrapper>
          <ProfileImg src={MAnswer.author.image} />
          <UserInfoWrapper>
            <UserInfo>
              <Paragraph sizeType="base">{MAnswer.author.username}</Paragraph>
              <CompanyImg src={MAnswer.author.company} />
            </UserInfo>
            <SubText sizeType="xm">작성자가 다니는 회사 이름 받아올 수 있을까</SubText>
          </UserInfoWrapper>
        </AuthorWrapper>

        {/* 팔로우 버튼 */}
        {MAnswer.author.isFollowed && <Button>팔로잉</Button>}
        {MAnswer.author.isFollowed || (
          <FollowButton designType="blueEmpty" fontSize="14px">
            팔로우
          </FollowButton>
        )}
      </UpperWraaper>

      <Line />

      <Paragraph sizeType="base">{MAnswer.content}</Paragraph>
      <Like>
        {MAnswer.isLiked && <IconLikeFill />}
        {MAnswer.isLiked || <IconLikeEmpty />}
        <SubText sizeType="xm">{MAnswer.likeCount}</SubText>
      </Like>
    </AnswerDiv>
  );
};

export default Answer;
