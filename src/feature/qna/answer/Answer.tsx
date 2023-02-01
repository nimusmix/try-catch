import styled from 'styled-components';
import { IconLikeEmpty, IconLikeFill } from '../../components/icons/Icons';
import { Button, Div, Paragraph } from '../../components';
import { IAnswer } from '../../interface/qna';
import getImageUrl from '../../utils/getImageUrl';

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

const Answer = ({ answer }: { answer: IAnswer }) => {
  return (
    <AnswerDiv>
      <UpperWraaper>
        <AuthorWrapper>
          <ProfileImg src={answer.author.profileImage} />
          <UserInfoWrapper>
            <UserInfo>
              <Paragraph sizeType="base">{answer.author.userName}</Paragraph>
              <CompanyImg
                src={
                  answer.author.companyName
                    ? getImageUrl(answer.author.companyName, 'logo')
                    : new URL(`/src/assets/favicon.ico`, import.meta.url).href
                }
                alt={answer.author.companyName}
              />
            </UserInfo>
            <SubText sizeType="xm">{answer.author.companyName}</SubText>
          </UserInfoWrapper>
        </AuthorWrapper>

        {/* 팔로우 버튼 */}
        {answer.author.isFollowed && <Button>팔로잉</Button>}
        {answer.author.isFollowed || (
          <FollowButton designType="blueEmpty" fontSize="14px">
            팔로우
          </FollowButton>
        )}
      </UpperWraaper>

      <Line />

      <Paragraph sizeType="base">{answer.content}</Paragraph>
      <Like>
        {answer.isLiked && <IconLikeFill />}
        {answer.isLiked || <IconLikeEmpty />}
        <SubText sizeType="xm">{answer.likeCount}</SubText>
      </Like>
    </AnswerDiv>
  );
};

export default Answer;
