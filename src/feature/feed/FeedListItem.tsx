import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { RxBookmark, RxBookmarkFilled } from 'react-icons/rx';
import { useState } from 'react';
import { Button, MiniTitle, Paragraph } from '../../components';
import { isDarkState } from '../../recoil';

const Wrapper = styled.article`
  display: flex;
  border-bottom: 1px solid var(--colors-black-200);
  &:hover {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-400)' : 'var(--colors-white-400)'};
  }
`;

const ArticleWrapper = styled.article`
  width: 630px;
  padding: 1rem 2rem;
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

const Icons = styled.button`
  display: flex;
  align-items: center;
  svg {
    margin-left: 0.6rem;
    cursor: pointer;
  }
  z-index: 2;
`;

const FeedThumbnailImg = styled.div<{ image: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 11.5rem;
  height: 7.875rem;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: var(--borders-radius-base);
  margin: auto 1rem;
`;
const CompanyImg = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  margin: auto 8px;
`;

const BlogTitle = styled.span`
  display: flex;
`;

export interface IFeedListItemProps {
  blogURL: string;
  companyName: string;
  content: string;
  createdAt: string;
  feedId: string;
  isBookmarked: boolean;
  tags: string[];
  thumbnailImage: string;
  title: string;
}

const FeedListItem = ({
  title,
  content,
  tags,
  isBookmarked,
  blogURL,
  companyName,
  thumbnailImage,
}: IFeedListItemProps) => {
  const isDark = useRecoilValue(isDarkState);
  const [bookMarkIcon, setBookMarkIcon] = useState(isBookmarked);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBookMarkIcon(!bookMarkIcon);
    e.preventDefault();

    // isBookmarked 상태 변화 보내기
    // /bookmark
    // body{
    //   id: number,
    //   type :string; // feed
    // }
  };

  return (
    <a href={`${blogURL}`} target="_blank" rel="noreferrer" style={{ zIndex: '1' }}>
      <Wrapper>
        <FeedThumbnailImg image={thumbnailImage} />
        <ArticleWrapper>
          <QuestionHeader>
            <BlogTitle>
              <MiniTitle
                sizeType="xl"
                color={isDark ? 'var(--colors-white-500)' : 'var(--colors-dark-500)'}
                textAlign="left"
              >
                {title.length > 36 ? `${title.slice(0, 36)}...` : title}
              </MiniTitle>
              <CompanyImg
                src={
                  companyName ? `/src/assets/logo/${companyName}.png` : `/src/assets/favicon.ico`
                }
                alt={`${companyName}`}
              />
            </BlogTitle>
            <Icons onClick={handleClick}>
              {/* 북마크 */}
              {bookMarkIcon && <RxBookmarkFilled size="30" color="var(--colors-brand-500)" />}
              {bookMarkIcon || <RxBookmark size="30" color="var(--colors-brand-500)" />}
            </Icons>
          </QuestionHeader>

          <QuestionBody>
            <Paragraph
              sizeType="base"
              color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
              style={{ width: '510px' }}
            >
              {content.length > 90 ? `${content.slice(0, 90)}...` : content}
            </Paragraph>
          </QuestionBody>

          <QuestionFooter>
            <TagsWrapper>
              {tags.map((tag) => (
                <Button
                  key={tag}
                  as="span"
                  designType="blueEmpty"
                  color="var(--colors-brand-500)"
                  fontSize="var(--fonts-body-xm)"
                  padding="2px 10px"
                  borderRadius="var(--borders-radius-base)"
                >
                  {tag}
                </Button>
              ))}
            </TagsWrapper>
          </QuestionFooter>
        </ArticleWrapper>
      </Wrapper>
    </a>
  );
};

export default FeedListItem;
