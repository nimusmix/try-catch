import styled from 'styled-components';
import { Button, Div, MiniTitle, Paragraph } from '../../components';
import { IQuestion } from '../../apis/qna/qna-type';
import {
  IconBookmarkEmpty,
  IconBookmarkFill,
  IconCheckCircle,
  IconLikeEmpty,
  IconLikeFill,
  IconShare,
} from '../../components/icons/Icons';
import getImageUrl from '../../utils/getImageUrl';
import elapsedTime from '../../utils/elapsed-time';
import { COMPANY } from '../../constant/company';
import MilkdownViewer from '../text-editor/MilkdownViewer';

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
  padding: 1.5rem 1.5rem 1rem;
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

const UpperTag = styled(Button)``;

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
`;

const Question = ({
  questionId,
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
}: IQuestion) => {
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
              {category}
            </UpperTag>

            {/* 해결 여부 */}
            {isSolved && (
              <UpperTag
                as="span"
                designType="greenFill"
                fontSize="14px"
                padding="0.2rem 0.6rem"
                margin="0 0 0 0.4rem"
                borderRadius="10px"
              >
                <IconCheckCircle size="14" className="solved-icon" />
                &nbsp;Catched
              </UpperTag>
            )}
          </UpperTagWrapper>

          <Icons>
            {/* 북마크 */}
            {isBookmarked && <IconBookmarkFill size="20" color="var(--colors-brand-500)" />}
            {isBookmarked || <IconBookmarkEmpty size="20" color="var(--colors-brand-500)" />}

            {/* 공유 */}
            <IconShare size="16" color="var(--colors-brand-500)" />
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

      <Like>
        {isLiked && <IconLikeFill />}
        {isLiked || <IconLikeEmpty />}
        <SubText sizeType="xm">{likeCount}</SubText>
      </Like>
    </QuestionDiv>
  );
};

export default Question;
