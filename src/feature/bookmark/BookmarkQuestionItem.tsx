import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { IconComment, IconEye, IconLikeEmpty, IconHash } from '../../components/icons/Icons';
import { Button, Card, MiniTitle, Paragraph } from '../../components';
import { isDarkState } from '../../recoil';
import elapsedTime from '../../utils/elapsed-time';
import { IBookmarkQuestion } from '../../interface/bookmark';
import categoryToKorean from '../../utils/category-to-korean';
import { DefaultDiv } from './BookmarkFeedItem';

const Wrapper = styled.article`
  width: 800px;
  padding: 1rem;
  margin-left: 1rem;
`;

const QuestionWrapper = styled(Card)`
  width: 100%;
  margin: 0rem;
  padding: 1rem 3rem;

  h3 {
    transition: color 0.3s ease-in;
  }

  &:hover h3 {
    color: var(--colors-brand-500);
  }
  & > span {
    margin-bottom: 1rem;
  }

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 0 0.6rem;
  }
`;

const QuestionHeader = styled(DefaultDiv)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled(DefaultDiv)`
  max-width: 100%;
  display: -webkit-box;
  margin: 0.6rem 0 0.5rem;
`;

const QuestionBody = styled.div`
  margin: 0.5rem 0 0.5rem;
  max-height: 75px;
  overflow: hidden;

  .markdown * {
    background: unset;
    margin: unset;
    font: unset;
  }

  p {
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
  margin-top: 1.3rem;
`;

const TagsWrapper = styled.div`
  & > span {
    display: inline-flex;
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
  }
`;

const BookmarkQuestionItem = ({
  title,
  content,
  category,
  createdAt,
  viewCount,
  likeCount,
  answerCount,
  tags,
}: Partial<IBookmarkQuestion>) => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <Wrapper>
      <QuestionWrapper>
        <div>
          <Button
            as="span"
            designType="purpleFill"
            fontSize="var(--fonts-body-xm)"
            padding="2.2px 10px"
          >
            {categoryToKorean(category)}
          </Button>
          <Paragraph
            as="span"
            sizeType="sm"
            color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
          >
            {createdAt ? elapsedTime(createdAt) : null}
          </Paragraph>
        </div>
        <QuestionHeader>
          <TitleWrapper>
            <MiniTitle
              sizeType="xl"
              color={isDark ? 'var(--colors-white-500)' : 'var(--colors-dark-500)'}
              textAlign="left"
            >
              {title}
            </MiniTitle>
          </TitleWrapper>
        </QuestionHeader>

        <QuestionBody>
          <ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
            {content as string}
          </ReactMarkdown>
        </QuestionBody>

        <QuestionFooter>
          <TagsWrapper>
            {tags?.map((tag) => {
              if (tag === '') return null;
              return (
                <Tag
                  key={tag}
                  as="span"
                  fontSize="var(--fonts-body-xm)"
                  padding="2px 10px"
                  borderRadius="var(--borders-radius-lg)"
                >
                  <IconHash />
                  {tag}
                </Tag>
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
      </QuestionWrapper>
    </Wrapper>
  );
};

export default BookmarkQuestionItem;
