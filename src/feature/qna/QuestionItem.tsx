import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { IconLikeEmpty, IconEye, IconComment } from '../../components/icons/Icons';
import { Button, MiniTitle, Paragraph } from '../../components';
import { isDarkState } from '../../recoil';
import { IQuestion } from '../../interface/qna';
import elapsedTime from '../../utils/elapsed-time';

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

const QuestionItem = ({
  category,
  title,
  content,
  timestamp,
  viewCount,
  likeCount,
  answerCount,
  tags,
}: Partial<IQuestion>) => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <Wrapper>
      <QuestionHeader>
        <MiniTitle
          sizeType="xl"
          color={isDark ? 'var(--colors-white-500)' : 'var(--colors-dark-500)'}
          textAlign="left"
        >
          {title}
        </MiniTitle>
        <Paragraph
          as="span"
          sizeType="sm"
          color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
        >
          {timestamp ? elapsedTime(timestamp) : null}
        </Paragraph>
      </QuestionHeader>

      <QuestionBody>
        <Paragraph
          sizeType="base"
          color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
        >
          {content}
        </Paragraph>
      </QuestionBody>

      <QuestionFooter>
        <TagsWrapper>
          <Button
            as="span"
            designType="purpleFill"
            fontSize="var(--fonts-body-xm)"
            padding="2.2px 10px"
          >
            {category}
          </Button>
          {tags?.map((tag) => (
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
          ))}
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
