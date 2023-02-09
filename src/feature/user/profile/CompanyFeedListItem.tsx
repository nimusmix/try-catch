import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { IconBookmarkEmpty, IconBookmarkFill } from '../../../components/icons/Icons';
import { isDarkState } from '../../../recoil';
import { IFeedItemProps } from '../../feed/IFeed';
import FeedTag from '../../feed/FeedTag';
import { postFeedRead } from '../../../apis/feed/feed';
import { MiniTitle, Paragraph } from '../../../components';

const DefaultDIv = styled.div`
  /* 한 줄 자르기 */
  display: inline-block;
  width: 98%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.8;
  height: 1.8rem;
  text-align: left;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const Wrapper = styled.article`
  display: flex;
  border-bottom: 1px solid var(--colors-black-200);
  &:hover {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-400)' : 'var(--colors-white-400)'};
  }
`;

const BlogWrapper = styled.div`
  width: 630px;
  padding: 1rem 1.5rem;
`;

const FeedBody = styled(DefaultDIv)`
  line-height: 1.5;
  height: 3rem;
  text-align: left;
  -webkit-line-clamp: 2;
  margin-bottom: 0.75rem;
  display: -webkit-box;
`;

const FeedFooter = styled(DefaultDIv)`
  line-height: 1.3;
  height: 1.6rem;
  margin-bottom: 0.75rem;
`;

const BookmarkButton = styled.button`
  display: flex;
  align-items: center;

  svg {
    margin-left: 0.6rem;
    margin-bottom: 0.25rem;
    cursor: pointer;
  }
  z-index: 2;
`;

const FeedThumbnailImg = styled.div<{ image: string }>`
  width: 12rem;
  height: 8rem;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: var(--borders-radius-base);
`;

const FeedThumbnailImgWrapper = styled.div`
  background: var(--colors-brand-200);
  border-radius: var(--borders-radius-base);
  margin: auto 0rem auto 1.5rem;
`;

const BlogTitle = styled(DefaultDIv)`
  display: -webkit-box;
  margin: 0.6rem 0 0.5rem;
`;

const TitleBookmarkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface LinkProps {
  children: React.ReactNode;
  url: string;
  onClick?: () => void;
}

const LinkWrapper = ({ children, url, onClick }: LinkProps) => {
  return (
    <a href={`${url}`} target="_blank" rel="noreferrer" style={{ zIndex: '1' }} onClick={onClick}>
      {children}
    </a>
  );
};

const BlogMiniTitle = styled(MiniTitle)`
  width: 510px;
  :hover {
    color: var(--colors-brand-500);
  }
`;

const CompanyFeedListItem = ({
  title,
  summary,
  tags,
  keywords,
  isBookmarked,
  url,
  thumbnailImage,
}: Partial<IFeedItemProps>) => {
  const isDark = useRecoilValue(isDarkState);
  const [bookMarkIcon, setBookMarkIcon] = useState(isBookmarked);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setBookMarkIcon(!bookMarkIcon);
    e.preventDefault();
  };

  return (
    <Wrapper>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LinkWrapper url={url!}>
          <FeedThumbnailImgWrapper>
            <FeedThumbnailImg image={thumbnailImage!} />
          </FeedThumbnailImgWrapper>
        </LinkWrapper>
      </div>

      <BlogWrapper>
        <TitleBookmarkWrapper>
          <BlogTitle>
            {/* 북마크 */}
            <LinkWrapper url={url!}>
              <BlogMiniTitle
                sizeType="xl"
                color={isDark ? 'var(--colors-white-500)' : 'var(--colors-dark-500)'}
                textAlign="left"
              >
                {title}
              </BlogMiniTitle>
            </LinkWrapper>
          </BlogTitle>
          <BookmarkButton onClick={handleClick}>
            {bookMarkIcon && <IconBookmarkFill size="27" color="var(--colors-brand-500)" />}
            {bookMarkIcon || <IconBookmarkEmpty size="27" color="var(--colors-brand-500)" />}
          </BookmarkButton>
        </TitleBookmarkWrapper>

        <FeedBody>
          <LinkWrapper url={url!}>
            <Paragraph
              sizeType="base"
              color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
              style={{ width: '510px' }}
            >
              {summary}
            </Paragraph>
          </LinkWrapper>
        </FeedBody>

        <FeedFooter>
          <FeedTag tags={tags || keywords} />
        </FeedFooter>
      </BlogWrapper>
    </Wrapper>
  );
};

export default CompanyFeedListItem;
