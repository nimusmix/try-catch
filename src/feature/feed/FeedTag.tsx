import styled from 'styled-components';
import { Button } from '../../components';

interface IFeedPopularTag {
  tags: Array<string>;
}

const TagsWrapper = styled.div`
  & > span {
    display: inline-block;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const FeedTag = ({ tags }: IFeedPopularTag) => {
  const handleClick = () => {};
  // /search?type=feed&keyword=&page=&size&

  return (
    <TagsWrapper>
      {tags &&
        tags.map((tag, index) => {
          const tagIdx = `${tag}-${index}`;
          return (
            <Button
              key={tagIdx}
              as="span"
              designType="blueEmpty"
              color="var(--colors-brand-500)"
              fontSize="var(--fonts-body-xm)"
              padding="0.125rem 0.5rem"
              borderRadius="var(--borders-radius-base)"
              onClick={handleClick}
            >
              {tag}
            </Button>
          );
        })}
    </TagsWrapper>
  );
};

export default FeedTag;
