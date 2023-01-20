import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { HiOutlineThumbUp } from 'react-icons/hi';
import { BiComment } from 'react-icons/bi';
import { AiOutlineEye } from 'react-icons/ai';
import { MiniTitle, Paragraph } from '../../components';
import { StyledButton } from '../../components/button/Button';
import { isDarkState } from '../../recoil';
import { IQuestionItemList, ITag } from './QuestionList';

const Wrapper = styled.article`
  max-width: 660px;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--colors-black-200);
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
  margin: 0.6rem 0 0.5rem;
`;

const QuestionBody = styled.div`
  margin-bottom: 0.75rem;
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
  title,
  timestamp,
  content,
  viewCount,
  likeCount,
  answerCount,
  tags,
}: IQuestionItemList) => {
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
          sizeType="xm"
          color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
        >
          {timestamp}
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
          {tags.map(({ id, tagName }: ITag) => (
            <StyledButton
              key={id}
              as="span"
              designType="blueEmpty"
              color="var(--colors-brand-500)"
              fontSize="var(--fonts-body-xm)"
              padding="2px 10px"
              borderRadius="var(--borders-radius-base)"
            >
              {tagName}
            </StyledButton>
          ))}
        </TagsWrapper>
        <InfoWrapper>
          <Paragraph as="span" sizeType="sm">
            <AiOutlineEye />
            {viewCount}
          </Paragraph>
          <Paragraph as="span" sizeType="sm">
            <HiOutlineThumbUp />
            {likeCount}
          </Paragraph>
          <Paragraph as="span" sizeType="sm">
            <BiComment />
            {answerCount}
          </Paragraph>
        </InfoWrapper>
      </QuestionFooter>
    </Wrapper>
  );
};

export default QuestionItem;
