/* eslint-disable jsx-a11y/no-static-element-interactions */
import styled, { css } from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { TbEdit } from 'react-icons/tb';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  IconCheckCircle,
  IconDot,
  IconLikeEmpty,
  IconLikeFill,
} from '../../../components/icons/Icons';
import { Button, Paragraph } from '../../../components';
import { IAnswer, IQuestion } from '../../../interface/qna';
import getImageUrl from '../../../utils/getImageUrl';
import { COMPANY } from '../../../constant/company';
import { cancelLike, postLike } from '../../../apis/like/like';
import useIsMe from '../../../hooks/useIsMe';
import { postFollow, putFollow } from '../../../apis/user/user';
import { putAnswer, selectAnswer } from '../../../apis/answer/answer';
import { isLoggedInState, toastState } from '../../../recoil';
import elapsedTime from '../../../utils/elapsed-time';

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
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'rgba(36, 42, 54, 1)' : 'var(--colors-brand-200)'};
  height: 100%;
  padding: 1rem;

  button {
    padding: 0.2rem 0.7rem;
  }

  .selected {
    color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-success-400)' : 'var(--colors-success-800)'};
  }

  .edit {
    color: var(--colors-brand-500);
    cursor: pointer;
  }

  svg {
    align-self: baseline;
  }
`;

const AuthorWrapper = styled.div`
  cursor: pointer;
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

const Like = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
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
  position: relative;
  display: flex;
  justify-content: space-between;

  .modify-button {
    position: absolute;
    right: 2.5rem;
    bottom: 3.5rem;
  }

  button {
    margin: 1rem 0 1rem 1rem;
  }

  ${Like} {
    margin: 1rem 1rem 1rem 0;
  }
`;

const TextAreaFocus = css`
  &:focus {
    outline: 2px solid var(--colors-brand-500);
  }
`;

const AnswerForm = styled.textarea<{ isEdit: boolean }>`
  width: 100%;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'rgb(46, 52, 64)' : 'rgb(247, 248, 255)'};
  color: ${({ theme: { textColor } }) => textColor};
  resize: none;
  border-radius: 0.5rem;
  outline: none;
  padding: 1rem;
  ${({ isEdit }) => isEdit && TextAreaFocus}
`;

const SubTextWrapper = styled.span`
  display: flex;
  margin-top: 0.2rem;
`;

const AcceptedSign = styled.div`
  display: flex;
  margin: 0 0 1rem 0.5rem;
  align-items: baseline;

  & * {
    color: ${({ theme: { isDark, successColor } }) => (isDark ? successColor : '#0db821')};
  }

  svg {
    margin-right: 0.5rem;
    translate: 0 2px;
  }
`;

const Answer = ({
  answer,
  questionId,
  questionAuthorId,
  isSolved,
}: {
  answer: IAnswer;
  questionId: number;
  questionAuthorId: number;
  isSolved: boolean;
}) => {
  const isMe = useIsMe(answer.author.userId);
  const isAuthor = useIsMe(questionAuthorId);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isLogin = useRecoilValue(isLoggedInState);
  const setToast = useSetRecoilState(toastState);
  const [isEdit, setIsEdit] = useState(false);
  const [answerInput, setAnswerInput] = useState(() => answer.content);
  const navigate = useNavigate();

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
      if (ans.author.userId === answer.author.userId) {
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
      onMutate: () => {
        updateLike('up');
      },
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

  const { mutate: select } = useMutation(['select'], selectAnswer(questionId, answer.answerId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['question', `${questionId}`]);
      setToast({ type: 'positive', message: '댓글을 채택했어요', isVisible: true });
    },
  });

  const { mutate: modifyAnswer } = useMutation(
    ['answer', 'update', answer.answerId],
    putAnswer(questionId, { answerId: answer.answerId, content: answerInput, hidden: false }),
    {
      onSuccess: () => {
        setToast({ type: 'positive', message: '댓글 수정 성공', isVisible: true });
        queryClient.invalidateQueries(['question', `${questionId}`]);
      },
      onError: () => {
        setToast({ type: 'negative', message: '댓글 수정 실패', isVisible: true });
      },
      onSettled: () => setIsEdit(false),
    }
  );

  useEffect(() => {
    if (isEdit) {
      inputRef.current!.focus();
      inputRef.current!.readOnly = false;
    } else {
      inputRef.current!.blur();
      inputRef.current!.readOnly = true;
      inputRef.current!.style.height = `${inputRef.current!.scrollHeight}px`;
    }
  }, [isEdit]);

  const onClickLikeHandler = () => {
    if (!isLogin) {
      setToast({ type: 'negative', message: '로그인 후 이용하실 수 있어요', isVisible: true });
      return;
    }
    if (answer.isLiked) {
      likeDown();
    } else {
      likeUp();
    }
  };

  const onChangeAnswerForm = (e: ChangeEvent<HTMLTextAreaElement>) => {
    inputRef.current!.style.height = 'auto';
    inputRef.current!.style.height = `${inputRef.current!.scrollHeight}px`;
    setAnswerInput(e.target.value);
  };

  const onClickFollowHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (!isLogin) {
      setToast({ type: 'negative', message: '로그인 후 이용하실 수 있어요', isVisible: true });
      return;
    }
    if (answer.author.isFollowed) {
      unFollow();
    } else {
      follow();
    }
  };

  return (
    <AnswerItem>
      <UpperWrapper>
        {answer.accepted && (
          <AcceptedSign>
            <IconCheckCircle className="selected" />
            <SubText sizeType="base">채택된 답변</SubText>
          </AcceptedSign>
        )}
        <AuthorWrapper
          onClick={() => {
            navigate(`/profile/${answer.author.userName}`);
          }}
        >
          <ImageWrapper>
            <ProfileImg src={answer.author.profileImage} />
          </ImageWrapper>
          <UserInfoWrapper>
            <UserInfo>
              <Paragraph sizeType="lg">{answer.author.userName}</Paragraph>
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
                  <FollowButton
                    designType={answer.author.isFollowed ? 'blueFill' : 'blueEmpty'}
                    fontSize="14px"
                  >
                    {answer.author.isFollowed ? '팔로잉' : '팔로우'}
                  </FollowButton>
                </span>
              )}
            </UserInfo>
            <SubTextWrapper>
              <SubText sizeType="xm">
                {answer.author.companyName === 'default'
                  ? '지나가던 개발자'
                  : answer.author.companyName}
              </SubText>
              <IconDot />
              <SubText sizeType="xm">{elapsedTime(answer.timestamp)}</SubText>
            </SubTextWrapper>
          </UserInfoWrapper>
        </AuthorWrapper>

        {isMe && <TbEdit className="edit" onClick={() => setIsEdit((prev) => !prev)} />}
      </UpperWrapper>

      <AnswerBody>
        <AnswerForm
          rows={1}
          isEdit={isEdit}
          ref={inputRef}
          value={answerInput}
          onChange={onChangeAnswerForm}
        />
      </AnswerBody>
      <AnswerFooter>
        <span>
          {/* 현재 유저가 질문 작성자 and 문제가 해결되지 않았을 때 and 댓글 작성자가 내가 아닐때 */}
          {isAuthor && !isSolved && !isMe ? (
            <Button designType="greenFill" onClick={() => select()}>
              채택하기
            </Button>
          ) : null}
        </span>
        <Like as="span" onClick={onClickLikeHandler}>
          {answer.isLiked && <IconLikeFill color="var(--colors-brand-500)" />}
          {answer.isLiked || <IconLikeEmpty />}
          <SubText sizeType="xm">{answer.likeCount}</SubText>
        </Like>
        {isEdit && (
          <Button className="modify-button" onClick={() => modifyAnswer()}>
            수정하기
          </Button>
        )}
      </AnswerFooter>
    </AnswerItem>
  );
};

export default Answer;
