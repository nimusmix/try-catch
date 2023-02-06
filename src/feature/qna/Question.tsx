/* eslint-disable jsx-a11y/no-static-element-interactions */
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button, Div, MiniTitle, Paragraph } from '../../components';
import {
  IconBookmarkEmpty,
  IconBookmarkFill,
  IconCheckCircle,
  IconLikeEmpty,
  IconLikeFill,
  IconMore,
} from '../../components/icons/Icons';
import getImageUrl from '../../utils/getImageUrl';
import elapsedTime from '../../utils/elapsed-time';
import { COMPANY } from '../../constant/company';
import MilkdownViewer from '../text-editor/MilkdownViewer';
import { IQuestion } from '../../interface/qna';
import { cancelLike, postLike } from '../../apis/like/like';
import { postBookmark, putBookmark } from '../../apis/bookmark/bookmark';
import { isLoggedInState, toastState } from '../../recoil';

const QuestionDiv = styled(Div)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  padding: 0;
  margin-bottom: 2.5rem;
  background-color: ${({ theme: { isDark } }) => (isDark ? 'rgba(46, 52, 64, 1)' : '#f7f8ff')};
  border: ${({ theme: { isDark } }) => (isDark ? '' : '1px solid var(--colors-brand-200)')};
`;

const UpperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 1rem;
  justify-content: space-between;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'rgba(36, 42, 54, 1)' : 'var(--colors-brand-200)'};
  border-bottom: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-100)' : 'rgb(182, 202,229)'}
    solid 1px;

  .question-icons {
    display: flex;
    justify-content: space-between;
  }

  .author {
    display: flex;
    margin-right: 1rem;
    align-items: center;
    margin-top: 0.5rem;
  }
`;

const UpperTagWrapper = styled.div`
  display: flex;
`;

const UpperTag = styled(Button)`
  margin-right: 0.5rem;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-left: 0.6rem;
    cursor: pointer;
  }
`;

const SubText = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
`;

const ProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: var(--borders-radius-round);
`;

const CompanyImg = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 4px;
`;

const Like = styled.span`
  display: flex;
  align-items: center;
  margin: 1rem auto 1.5rem;
  cursor: pointer;
  svg {
    margin-right: 0.2rem;
    color: ${({ theme }) => theme.textColor100};
  }
`;

const QuestionBody = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;

  & > div:first-child {
    margin-bottom: 1rem;
  }

  .milkdown {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-300)' : 'var(--colors-brand-100)'};
    color: ${({ theme: { textColor } }) => textColor};
    box-shadow: none;
    border-radius: var(--borders-radius-base);
  }

  .milkdown .editor {
    & > * {
      margin: 0.5rem 0;
    }
  }

  .milkdown .editor[contenteditable='false'] {
    & > * {
      margin: 0.5rem 0;
    }
  }
`;

const toKorean = (category: string | undefined) => {
  if (category === 'DEV') {
    return '개발';
  }
  return '커리어';
};

const Question = ({
  tags,
  updatedAt,
  content,
  timestamp,
  viewCount,
  likeCount,
  answerCount,
  answers,
  isLiked,
  title,
  errorCode,
  author,
  category,
  isBookmarked,
  isSolved,
  questionId,
}: IQuestion) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [toast, setToast] = useRecoilState(toastState);

  const queryClient = useQueryClient();
  const updateLike = (type: 'up' | 'down') => {
    const previousData = queryClient.getQueryData(['question', `${questionId}`]);

    if (previousData) {
      // previousData 가 있으면 setQueryData 를 이용하여 즉시 새 데이터로 업데이트 해준다.
      queryClient.setQueryData<IQuestion>(['question', `${questionId}`], (oldData: any) => {
        return {
          ...oldData,
          likeCount: type === 'up' ? likeCount + 1 : likeCount - 1,
          isLiked: type === 'up',
        };
      });
    }

    return {
      previousData,
    };
  };

  const updateBookmark = (type: 'do' | 'cancel') => {
    const previousData = queryClient.getQueryData(['question', `${questionId}`]);

    if (previousData) {
      // previousData 가 있으면 setQueryData 를 이용하여 즉시 새 데이터로 업데이트 해준다.
      queryClient.setQueryData<IQuestion>(['question', `${questionId}`], (oldData: any) => {
        return {
          ...oldData,
          isBookmarked: type === 'do',
        };
      });
    }

    return {
      previousData,
    };
  };

  const { mutate: like } = useMutation(
    ['like', 'up'],
    () => postLike({ id: questionId, type: 'QUESTION' }),
    {
      onMutate: () => updateLike('up'),
    }
  );
  const { mutate: cancel } = useMutation(
    ['like', 'down'],
    () => cancelLike({ id: questionId, type: 'QUESTION' }),
    {
      onMutate: () => updateLike('down'),
    }
  );

  const { mutate: addBookmark } = useMutation(
    ['bookmark'],
    () => postBookmark({ id: questionId, type: 'QUESTION' }),
    {
      onMutate: () => updateBookmark('do'),
    }
  );
  const { mutate: cancelBookmark } = useMutation(
    ['cancelBookmark'],
    () => putBookmark({ id: questionId, type: 'QUESTION' }),
    {
      onMutate: () => updateBookmark('cancel'),
    }
  );

  const onClickLikeHandler = () => {
    if (isLiked) {
      cancel();
    } else {
      like();
    }
  };

  const onClickBookmarkHandler = () => {
    if (isBookmarked) {
      addBookmark();
    } else {
      setToast({
        type: 'negative',
        message: '로그인 후 북마크 기능을 이용해보세요! ',
        isVisible: true,
      });
    }
  };

  return (
    <QuestionDiv>
      <UpperWrapper>
        <div className="question-icons">
          <UpperTagWrapper>
            {/* 카테고리 */}
            <UpperTag
              as="span"
              designType="purpleFill"
              fontSize="14px"
              padding="0.2rem 0.6rem"
              borderRadius="10px"
            >
              {toKorean(category)}
            </UpperTag>
            {/* 해결 여부 */}
            {isSolved && (
              <UpperTag
                as="span"
                designType="greenFill"
                fontSize="14px"
                padding="0.2rem 0.6rem"
                margin="0 0 0.4rem"
                borderRadius="10px"
              >
                <IconCheckCircle size="14" className="solved-icon" />
                &nbsp;Catched
              </UpperTag>
            )}
            {tags.map((tag, index) => {
              if (tag === '') return null;
              return (
                <Button
                  key={String(tag + index)}
                  as="span"
                  designType="blueEmpty"
                  fontSize="var(--fonts-body-xm)"
                  padding="2px 10px"
                  margin="0 0.3rem 0 0"
                  borderRadius="var(--borders-radius-base)"
                >
                  #{tag}
                </Button>
              );
            })}
          </UpperTagWrapper>

          <Icons>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <span onClick={onClickBookmarkHandler}>
              {/* 북마크 */}
              {isBookmarked && <IconBookmarkFill size="20" color="var(--colors-brand-500)" />}
              {isBookmarked || <IconBookmarkEmpty size="20" color="var(--colors-brand-500)" />}
            </span>

            {/* TODO 드랍다운으로 */}
            {/* 공유, 수정, 삭제 */}
            <span>
              <IconMore size="18" color="var(--colors-brand-500)" />
            </span>
          </Icons>
        </div>

        <MiniTitle sizeType="3xl" textAlign="left" margin="1rem 0 0.6rem 0" fontWeight="600">
          {title}
        </MiniTitle>

        <div className="author">
          <ProfileImg src={author.profileImage} />
          <SubText sizeType="sm" margin="0 0.2rem 0 0.3rem">
            {author.userName}
          </SubText>
          <CompanyImg
            src={author.companyName && getImageUrl(COMPANY[author.companyName], 'logo', 'png')}
            alt={author.companyName}
          />
          <SubText sizeType="xm" margin="0 0 0 1rem">
            {elapsedTime(timestamp)}
          </SubText>
        </div>
      </UpperWrapper>
      <QuestionBody>
        <MilkdownViewer width="100%" data={content} />
        {errorCode && <MilkdownViewer width="100%" data={errorCode} />}
      </QuestionBody>

      <Like onClick={onClickLikeHandler}>
        {isLiked && <IconLikeFill />}
        {isLiked || <IconLikeEmpty />}
        <SubText sizeType="xm">{likeCount}</SubText>
      </Like>
    </QuestionDiv>
  );
};

export default Question;
