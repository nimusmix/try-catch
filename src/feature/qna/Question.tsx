import styled from 'styled-components';
import {
  IconBookmarkEmpty,
  IconBookmarkFill,
  IconLikeEmpty,
  IconLikeFill,
  IconCheckCircle,
  IconShare,
} from '../../components/icons/Icons';
import { Button, Div, MiniTitle, Paragraph } from '../../components';
import elapsedTime from '../../utils/elapsed-time';
import { IQuestion } from '../../interface/qna';
import getImageUrl from '../../utils/getImageUrl';

const QuestionDiv = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 820px;
  padding: 2rem;
`;

const UpperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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

const QuestionInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SubText = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
`;

const ProfileImg = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--borders-radius-round);
`;

const CompanyImg = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 4px;
`;

const Line = styled.div`
  margin-top: 1rem;
  margin-bottom: 1.6rem;
  border-bottom: 0.8px ${({ theme }) => theme.borderColor} solid;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.6rem;
  margin-left: auto;
  margin-right: auto;
  svg {
    margin-right: 0.2rem;
    color: ${({ theme }) => theme.textColor100};
  }
  p {
    margin-top: 0.1rem;
  }
`;

const Question = ({ question }: { question: IQuestion }) => {
  return (
    <QuestionDiv>
      <UpperWrapper>
        <UpperTagWrapper>
          {/* 카테고리 */}
          <UpperTag
            designType="purpleFill"
            fontSize="14px"
            padding="0.2rem 0.6rem"
            borderRadius="10px"
          >
            {question.category}
          </UpperTag>

          {/* 해결 여부 */}
          {question.isSolved && (
            <UpperTag
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
          {question.isBookmarked && <IconBookmarkFill size="20" color="var(--colors-brand-500)" />}
          {question.isBookmarked || <IconBookmarkEmpty size="20" color="var(--colors-brand-500)" />}

          {/* 공유 */}
          <IconShare size="16" color="var(--colors-brand-500)" />
        </Icons>
      </UpperWrapper>

      <MiniTitle sizeType="2xl" textAlign="left" margin="1rem 0 0.6rem 0" fontWeight="600">
        {question.title}
      </MiniTitle>

      <QuestionInfoWrapper>
        <ProfileImg src={question.author.profileImage} />
        <SubText sizeType="sm" margin="0 0.2rem 0 0.3rem">
          {question.author.userName}
        </SubText>

        <CompanyImg
          src={
            question.author.companyName
              ? getImageUrl(question.author.companyName, 'logo')
              : new URL(`/src/assets/favicon.ico`, import.meta.url).href
          }
          alt={question.author.companyName}
        />

        <SubText sizeType="xm" margin="0 0 0 1rem">
          {elapsedTime(question.timestamp)}
        </SubText>
      </QuestionInfoWrapper>

      <Line />

      <Paragraph sizeType="base">{question.content}</Paragraph>

      <Like>
        {question.isLiked && <IconLikeFill />}
        {question.isLiked || <IconLikeEmpty />}
        <SubText sizeType="xm">{question.likeCount}</SubText>
      </Like>
    </QuestionDiv>
  );
};

export default Question;
