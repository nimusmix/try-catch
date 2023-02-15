/* eslint-disable jsx-a11y/no-static-element-interactions */
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Button, Div, MiniTitle, Paragraph } from '../../components';
import {
  IconBookmarkEmpty,
  IconBookmarkFill,
  IconCheckCircle,
  IconLikeEmpty,
  IconLikeFill,
} from '../../components/icons/Icons';
import getImageUrl from '../../utils/getImageUrl';
import elapsedTime from '../../utils/elapsed-time';
import { COMPANY } from '../../constant/company';
import MilkdownViewer from '../text-editor/MilkdownViewer';
import { IQuestion } from '../../interface/qna';
import { cancelLike, postLike } from '../../apis/like/like';
import { postBookmark, putBookmark } from '../../apis/bookmark/bookmark';
import { isLoggedInState, toastState } from '../../recoil';
import QuestionDropdown from './question-detail/QuestionDropdown';
import categoryToKorean from '../../utils/category-to-korean';

const QuestionDiv = styled(Div)`
  //overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  padding: 0;
  margin-bottom: 2.5rem;
  background-color: ${({ theme: { isDark } }) => (isDark ? 'rgba(46, 52, 64, 1)' : '#f7f8ff')};
  border: ${({ theme: { isDark } }) =>
    isDark ? 'rgb(46, 52, 64)' : '1px solid var(--colors-brand-200)'};
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
  border-radius: 0.7rem 0.7rem 0 0;

  .question-icons {
    display: flex;
    justify-content: space-between;
  }

  .author {
    cursor: pointer;
    display: flex;
    margin-right: 1rem;
    align-items: center;
    margin-top: 0.5rem;
  }
`;

const UpperTagWrapper = styled.div`
  display: flex;

  .solved {
    margin-right: 1rem;
  }
`;

const UpperTag = styled(Button)`
  margin-right: 0.5rem;
  height: 2rem;
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
  width: auto;
  padding: 0.5rem 2rem;
  border: ${({ theme: { isDark } }) => (isDark ? 'var(--colors-black-100)' : 'rgb(182, 202,229)')}
    solid 1px;
  border-radius: var(--borders-radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto 1.5rem;
  cursor: pointer;
  svg {
    margin-right: 0.2rem;
    color: ${({ theme }) => theme.textColor100};
  }
  p {
    translate: 0 2px;
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

const Tags = styled.div`
  padding: 2rem;
`;

const Tag = styled(Button)`
  border: 1px solid
    ${({ theme: { isDark } }) => (isDark ? 'var(--colors-black-400)' : 'rgb(238 238 238/10)')};
  background-color: ${({ theme: { isDark } }) => (isDark ? 'hsl(220deg 13% 28%)' : '#d6e4fb')};
  color: ${({ theme: { textColor } }) => textColor};
  text-transform: capitalize;
  transition: border 0.2s ease-in, background-color 0.2s ease-in, color 0.2s ease-in;

  svg {
    margin-right: 0.1rem;
    color: ${({ theme: { isDark, textColor } }) =>
      isDark ? textColor : 'var(--colors-black-100)'};
    transition: color 0.2s ease-in;
  }

  &:hover svg,
  &:hover {
    color: #f1f1f1;
    background-color: var(--colors-brand-500);
  }
`;

/*
 * TODO 무조건 리팩토링 하기
 * */
const Question = ({
  tags,
  content,
  timestamp,
  likeCount,
  answerCount,
  isLiked,
  title,
  errorCode,
  author,
  category,
  isBookmarked,
  isSolved,
  questionId,
  ...rest
}: IQuestion) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [toast, setToast] = useRecoilState(toastState);
  const navigate = useNavigate();

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
      onMutate: () => {
        updateBookmark('do');
      },
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
    if (!isLoggedIn) {
      setToast({ type: 'negative', message: '로그인 후 이용하실 수 있어요', isVisible: true });
      return;
    }
    if (isLiked) {
      cancel();
    } else {
      like();
    }
  };

  const onClickBookmarkHandler = () => {
    if (!isLoggedIn) {
      setToast({
        type: 'negative',
        isVisible: true,
        message: '로그인 후 북마크를 이용해보세요! ',
      });
    } else if (isBookmarked) {
      cancelBookmark();
      setToast({
        type: 'positive',
        message: '북마크에서 제거되었습니다.',
        isVisible: true,
      });
    } else {
      addBookmark();
      setToast({
        type: 'positive',
        message: '북마크에 추가되었습니다.',
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
            <UpperTag as="span" designType="purpleFill" padding="0 0.7rem" borderRadius="10px">
              {categoryToKorean(category)}
            </UpperTag>
            <span className="solved">
              {/* 해결 여부 */}
              {isSolved && (
                <UpperTag
                  as="span"
                  designType="greenFill"
                  fontSize="14px"
                  padding="0.2rem 0.6rem"
                  borderRadius="10px"
                >
                  <IconCheckCircle size="14" className="solved-icon" />
                  &nbsp;Catched
                </UpperTag>
              )}
            </span>
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
            <QuestionDropdown
              questionId={questionId}
              userId={author.userId}
              answerCount={answerCount}
              isSolved={isSolved}
            />
          </Icons>
        </div>

        <MiniTitle sizeType="3xl" textAlign="left" margin="1rem 0 0.6rem 0" fontWeight="600">
          {title}
        </MiniTitle>

        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div className="author" onClick={() => navigate(`/profile/${author.userName}`)}>
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
        {isLiked && <IconLikeFill size={26} color="var(--colors-brand-500)" />}
        {isLiked || <IconLikeEmpty size={26} />}
        <SubText sizeType="base">{likeCount}</SubText>
      </Like>
      <Tags>
        {tags.map((tag, index) => {
          if (tag === '') return null;
          return (
            <Tag
              key={String(tag + index)}
              as="span"
              designType="blueEmpty"
              fontSize="var(--fonts-body-sm)"
              padding="2px 10px"
              margin="0 0.3rem 0 0"
              borderRadius="var(--borders-radius-base)"
            >
              #{tag}
            </Tag>
          );
        })}
      </Tags>
    </QuestionDiv>
  );
};

export default Question;
