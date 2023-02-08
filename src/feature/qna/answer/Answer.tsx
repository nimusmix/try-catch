/* eslint-disable jsx-a11y/no-static-element-interactions */
import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { IconCheckCircle, IconLikeEmpty, IconLikeFill } from '../../../components/icons/Icons';
import { Button, Paragraph } from '../../../components';
import { IAnswer, IQuestion } from '../../../interface/qna';
import getImageUrl from '../../../utils/getImageUrl';
import { COMPANY } from '../../../constant/company';
import { logOnDev } from '../../../utils/logging';
import { cancelLike, postLike } from '../../../apis/like/like';
import useIsMe from '../../../hooks/useIsMe';
import { postFollow, putFollow } from '../../../apis/user/user';
import { selectAnswer } from '../../../apis/answer/answer';

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

  svg {
    align-self: baseline;
  }
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
  margin-right: 1rem;
`;

const SubText = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
`;

const FollowButton = styled(Button)`
  padding: 0.1rem 0.25rem;
  font-size: var(--fonts-body-sm);
`;

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
  cursor: pointer;
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

const AnswerFooter = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin: 1rem 1rem 1rem 0;
  }
`;

const ReplyIconWrapper = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

const Answer = ({
  answer,
  setQuestionInput,
  questionId,
  questionAuthorId,
  isSolved,
}: {
  answer: IAnswer;
  setQuestionInput: Dispatch<SetStateAction<string>>;
  questionId: number;
  questionAuthorId: number;
  isSolved: boolean;
}) => {
  const isMe = useIsMe(answer.author.userId);
  const isAuthor = useIsMe(questionAuthorId);

  const queryClient = useQueryClient();
  const updateLike = (type: 'up' | 'down') => {
    const previousData = queryClient.getQueryData<IQuestion>(['question', `${questionId}`]);

    const newAnswers = previousData?.answers.map((ans) => {
      if (ans.answerId === answer.answerId) {
        return {
          ...ans,
          isLiked: type === 'up',
          likeCount: type === 'up' ? ans.likeCount + 1 : ans.likeCount - 1,
        };
      }
      return ans;
    });

    if (previousData) {
      // previousData 가 있으면 setQueryData 를 이용하여 즉시 새 데이터로 업데이트 해준다.
      queryClient.setQueryData<IQuestion>(['question', `${questionId}`], (oldData: any) => {
        return {
          ...oldData,
          answers: newAnswers,
        };
      });
    }

    return {
      previousData,
    };
  };

  const updateFollow = (type: 'do' | 'un') => {
    const previousData = queryClient.getQueryData<IQuestion>(['question', `${questionId}`]);

    const newAnswers = previousData?.answers.map((ans) => {
      if (ans.answerId === answer.answerId) {
        return {
          ...ans,
          author: {
            ...ans.author,
            isFollowed: type === 'do',
          },
        };
      }
      return ans;
    });

    if (previousData) {
      // previousData 가 있으면 setQueryData 를 이용하여 즉시 새 데이터로 업데이트 해준다.
      queryClient.setQueryData<IQuestion>(['question', `${questionId}`], (oldData: any) => {
        return {
          ...oldData,
          answers: newAnswers,
        };
      });
    }

    return {
      previousData,
    };
  };

  // 좋아요
  const { mutate: likeUp } = useMutation(
    ['like', 'up'],
    () => postLike({ id: answer.answerId, type: 'ANSWER' }),
    {
      onMutate: () => updateLike('up'),
    }
  );

  // 좋아요 취소
  const { mutate: likeDown } = useMutation(
    ['like', 'down'],
    () => cancelLike({ id: answer.answerId, type: 'ANSWER' }),
    {
      onMutate: () => updateLike('down'),
    }
  );

  // 팔로우
  const { mutate: follow } = useMutation(['follow'], () => postFollow(answer.author.userId), {
    onMutate: () => updateFollow('do'),
  });

  // 팔로우 취소
  const { mutate: unFollow } = useMutation(['unFollow'], () => putFollow(answer.author.userId), {
    onMutate: () => updateFollow('un'),
  });

  const { mutate: select } = useMutation(['select'], selectAnswer(questionId, answer.answerId));

  const onClickLikeHandler = () => {
    if (answer.isLiked) {
      likeDown();
    } else {
      likeUp();
    }
  };

  const onClickFollowHandler = () => {
    logOnDev.log('follow');
    if (answer.author.isFollowed) {
      unFollow();
    } else {
      follow();
    }
  };

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
                  answer.author.companyName &&
                  getImageUrl(COMPANY[answer.author.companyName], 'logo', 'png')
                }
                alt={answer.author.companyName}
              />
              {/* 팔로우 버튼 */}
              {isMe || (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <span onClick={onClickFollowHandler}>
                  {answer.author.isFollowed && (
                    <FollowButton designType="blueFill" fontSize="14px">
                      팔로잉
                    </FollowButton>
                  )}
                  {answer.author.isFollowed || (
                    <FollowButton designType="blueEmpty" fontSize="14px">
                      팔로우
                    </FollowButton>
                  )}
                </span>
              )}
            </UserInfo>
            <SubText sizeType="xm">
              {answer.author.companyName === 'default'
                ? '지나가던 개발자'
                : answer.author.companyName}
            </SubText>
          </UserInfoWrapper>
        </AuthorWrapper>
        {answer.accepted ? <IconCheckCircle /> : null}
      </UpperWrapper>

      <Line />
      <AnswerBody>
        <Paragraph sizeType="base">{answer.content}</Paragraph>
        <Like onClick={onClickLikeHandler}>
          {answer.isLiked && <IconLikeFill color="var(--colors-brand-500)" />}
          {answer.isLiked || <IconLikeEmpty />}
          <SubText sizeType="xm">{answer.likeCount}</SubText>
        </Like>
      </AnswerBody>
      <AnswerFooter>
        {/* 현재 유저가 작성자 and 문제가 해결되지 않았을 때 */}
        {isAuthor && !isSolved ? (
          <Button designType="greenFill" onClick={() => select()}>
            채택하기
          </Button>
        ) : null}
      </AnswerFooter>
    </AnswerItem>
  );
};

export default Answer;
