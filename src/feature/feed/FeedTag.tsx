import styled from 'styled-components';
import { Button } from '../../components';
import { ITag } from '../qna/QuestionList';

interface IFeedPopularTag {
  tags: ITag[];
}

const TagsWrapper = styled.div`
  & > span {
    display: inline-block;
    margin-right: 0.5rem;
  }
`;

const FeedTag = ({ tags }: IFeedPopularTag) => {
  const handleClick = () => {};
  // /search?type=feed&keyword=&page=&size&
  return (
    <TagsWrapper>
      {tags.map(({ id, tagName }: ITag) => (
        <Button
          key={id}
          as="span"
          designType="blueEmpty"
          color="var(--colors-brand-500)"
          fontSize="var(--fonts-body-xm)"
          padding="0.125rem 0.5rem"
          borderRadius="var(--borders-radius-base)"
          style={{ marginBottom: '0.5rem' }}
          onClick={handleClick}
        >
          {tagName}
        </Button>
      ))}
    </TagsWrapper>
  );
};

export default FeedTag;
