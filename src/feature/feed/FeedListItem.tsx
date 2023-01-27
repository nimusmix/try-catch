import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { IconBookmarkEmpty, IconBookmarkFill } from '../../components/icons/Icons';
import { ITag } from '../qna/QuestionList';
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
  /* border-bottom: 1px solid var(--colors-black-200); */
  /* cursor: pointer; */
  /* &:hover {
    background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-400)' : 'var(--colors-white-400)'};
  } */
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

export interface IFeedListItemProps {
  title: string;
  desc: string;
  company: {
    name: string;
    image: string;
  };
  publishedDate: string;
  tags: ITag[];
  isBookmarked: boolean;
  blogURL: string;
  thumbnailImage: string;
}

const FeedListItem = ({
  title,
  desc,

  tags,
  isBookmarked,
  blogURL,
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
            <MiniTitle
              sizeType="xl"
              color={isDark ? 'var(--colors-white-500)' : 'var(--colors-dark-500)'}
              textAlign="left"
            >
              {title}
            </MiniTitle>
            <Icons onClick={handleClick}>
              {/* 북마크 */}
              {bookMarkIcon && <IconBookmarkFill size="30" color="var(--colors-brand-500)" />}
              {bookMarkIcon || <IconBookmarkEmpty size="30" color="var(--colors-brand-500)" />}
            </Icons>
          </QuestionHeader>

          <QuestionBody>
            <Paragraph
              sizeType="base"
              color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
              style={{ width: '510px' }}
            >
              {desc.length > 90 ? `${desc.slice(0, 90)}...` : desc}
            </Paragraph>
          </QuestionBody>

          <QuestionFooter>
            <TagsWrapper>
              {tags.map(({ id, tagName }: ITag) => (
                <Button
                  key={id}
                  as="span"
                  designType="blueEmpty"
                  color="var(--colors-brand-500)"
                  fontSize="var(--fonts-body-xm)"
                  padding="2px 10px"
                  borderRadius="var(--borders-radius-base)"
                >
                  {tagName}
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
