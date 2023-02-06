import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
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
import useIsMe from '../../hooks/useIsMe';

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
  const queryClient = useQueryClient();
  const isMe = useIsMe(author.userId);
  const updateLike = (type: 'up' | 'down') => {
    const previousData = queryClient.getQueryData(['question', questionId]);

    console.log('prev', previousData);
    if (previousData) {
      // previousData 가 있으면 setQueryData 를 이용하여 즉시 새 데이터로 업데이트 해준다.
      queryClient.setQueryData<IQuestion>(['question', questionId], (oldData: any) => {
        console.log('old', oldData);
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
  const { mutate: like } = useMutation(
    ['like', 'up'],
    () => postLike({ id: questionId, type: 'QUESTION' }),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(['question', questionId]);
        const prev = queryClient.getQueryData(['question', questionId]);

        queryClient.setQueryData(['question', questionId], (old) => {
          return {
            ...old!,
            likeCount: likeCount + 1,
            isLiked: true,
          };
        });

        return {
          prev,
        };
      },
    }
  );
  const { mutate: cancel } = useMutation(
    ['like', 'down'],
    () => cancelLike({ id: questionId, type: 'QUESTION' }),
    {
      onMutate: () => updateLike('down'),
    }
  );

  const onClickLikeHandler = () => {
    if (isLiked) {
      cancel();
    } else {
      like();
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
            {isMe ? '내가 쓴거' : '남이 쓴거'}
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
            {/* 북마크 */}
            {isBookmarked && <IconBookmarkFill size="20" color="var(--colors-brand-500)" />}
            {isBookmarked || <IconBookmarkEmpty size="20" color="var(--colors-brand-500)" />}

            <IconMore size="18" color="var(--colors-brand-500)" />
            {/* 공유 */}
            {/* <IconShare size="16" color="var(--colors-brand-500)" /> */}
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
