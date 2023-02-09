import { useNavigate } from 'react-router-dom';
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
    z-index: 1001;
  }
`;

const FeedTag = ({ tags }: IFeedPopularTag) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const tagName: string = e.currentTarget.innerText;
    const encodeKeyword = encodeURIComponent(tagName);
    navigate(`/feed?keyword=${encodeKeyword}`);
    e.preventDefault();
  };

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
