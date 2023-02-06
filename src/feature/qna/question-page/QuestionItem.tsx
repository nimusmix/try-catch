import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  IconCheckCircle,
  IconComment,
  IconEye,
  IconLikeEmpty,
  IconTrying,
} from '../../../components/icons/Icons';
import { Button, MiniTitle, Paragraph } from '../../../components';
import { isDarkState } from '../../../recoil';
import elapsedTime from '../../../utils/elapsed-time';
import { IQuestion } from '../../../interface/qna';

const Wrapper = styled.article`
  max-width: 848px;
  padding: 2rem 2.25rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-400)' : 'var(--colors-white-400)'};
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionBody = styled.div`
  margin: 0.5rem 0 0.5rem;
  max-height: 100px;
  overflow: hidden;
  p {
    /* display: inline-block; */
    display: -webkit-box;
    max-height: 50px;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const QuestionFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TagsWrapper = styled.div`
  & > span {
    display: inline-block;
    margin-right: 0.5rem;
  }
`;

const InfoWrapper = styled.div`
  & > span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    margin-left: 1rem;
    color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'};

    svg {
      margin-right: 0.2rem;
    }
  }
`;

const UpperTag = styled(Button)`
  border: 1px solid #00000010;
`;

const TitleWrapper = styled.div`
  display: flex;

  h3 {
    margin-right: 0.5rem;
  }
`;

const toKorean = (category: string | undefined) => {
  if (category === 'DEV') {
    return '개발';
  }
  return '커리어';
};

const QuestionItem = ({
  category,
  title,
  content,
  timestamp,
  viewCount,
  likeCount,
  answerCount,
  tags,
  isSolved,
  isLiked,
  ...rest
}: Partial<IQuestion>) => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <Wrapper>
      <QuestionHeader>
        <TitleWrapper>
          <MiniTitle
            sizeType="xl"
            color={isDark ? 'var(--colors-white-500)' : 'var(--colors-dark-500)'}
            textAlign="left"
          >
            {title}
          </MiniTitle>
          {/* 해결된 질문 */}
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
          {/* 미해결 질문 */}
          {isSolved || (
            <UpperTag
              as="span"
              designType="skyFill"
              fontSize="14px"
              padding="0.2rem 0.6rem"
              margin="0 0 0.4rem"
              borderRadius="10px"
            >
              <IconTrying size="14" className="solved-icon" />
              &nbsp;Trying
            </UpperTag>
          )}
        </TitleWrapper>
        <Paragraph
          as="span"
          sizeType="sm"
          color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
        >
          {timestamp ? elapsedTime(timestamp) : null}
        </Paragraph>
      </QuestionHeader>

      <QuestionBody>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content as string}</ReactMarkdown>
      </QuestionBody>

      <QuestionFooter>
        <TagsWrapper>
          <Button
            as="span"
            designType="purpleFill"
            fontSize="var(--fonts-body-xm)"
            padding="2.2px 10px"
          >
            {toKorean(category)}
          </Button>
          {tags?.map((tag) => {
            if (tag === '') return null;
            return (
              <Button
                key={tag}
                as="span"
                designType="blueEmpty"
                fontSize="var(--fonts-body-xm)"
                padding="2px 10px"
                borderRadius="var(--borders-radius-base)"
              >
                {tag}
              </Button>
            );
          })}
        </TagsWrapper>
        <InfoWrapper>
          <Paragraph as="span" sizeType="sm">
            <IconEye />
            {viewCount}
          </Paragraph>
          <Paragraph as="span" sizeType="sm">
            <IconLikeEmpty />
            {likeCount}
          </Paragraph>
          <Paragraph as="span" sizeType="sm">
            <IconComment />
            {answerCount}
          </Paragraph>
        </InfoWrapper>
      </QuestionFooter>
    </Wrapper>
  );
};

export default QuestionItem;
