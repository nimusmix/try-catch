import styled from 'styled-components';
import { IconLikeEmpty, IconLikeFill } from '../../../components/icons/Icons';
import { Button, Paragraph } from '../../../components';
import { IAnswer } from '../../../interface/qna';
import getImageUrl from '../../../utils/getImageUrl';

const AnswerItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  background-color: ${({ theme: { isDark } }) => (isDark ? 'rgba(46, 52, 64, 1)' : '#f7f8ff')};
  border: ${({ theme: { isDark } }) => (isDark ? '' : '1px solid var(--colors-brand-200)')};
  border-radius: var(--borders-radius-base);
  margin-bottom: 2rem;
  padding: 0;
  overflow: hidden;
`;

const UpperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'rgba(36, 42, 54, 1)' : 'var(--colors-brand-200)'};
  height: 100%;
  padding: 1rem;
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

const ImageWrapper = styled.span`
  box-shadow: rgba(67, 71, 85, 0.27) 0 0 0.25rem, rgba(90, 125, 188, 0.05) 0 0.25rem 1rem;
  border-radius: var(--borders-radius-round);
  overflow: hidden;
`;

const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
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
  margin-bottom: 1.6rem;
  border-bottom: 0.8px
    ${({ theme: { isDark } }) => (isDark ? 'var(--colors-black-100)' : 'rgb(182, 202,229)')} solid;
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

const AnswerBody = styled.div`
  display: flex;
  padding: 1rem 2rem;
`;

const Answer = ({ answer }: { answer: IAnswer }) => {
  return (
    <AnswerItem>
      <UpperWrapper>
        <AuthorWrapper>
          <ImageWrapper>
            <ProfileImg src={answer.author.profileImage} />
          </ImageWrapper>
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
      </UpperWrapper>

      <Line />
      <AnswerBody>
        <Paragraph sizeType="base">{answer.content}</Paragraph>
        <Like>
          {answer.isLiked && <IconLikeFill />}
          {answer.isLiked || <IconLikeEmpty />}
          <SubText sizeType="xm">{answer.likeCount}</SubText>
        </Like>
      </AnswerBody>
    </AnswerItem>
  );
};

export default Answer;
