import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { Card, MiniTitle, Paragraph } from '../../components';
import { isDarkState } from '../../recoil';
import { IBookmarkFeed } from '../../interface/bookmark';
import FeedTag from '../feed/FeedTag';

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
  width: 800px;
  padding: 1rem;
  margin-left: 1rem;
`;

const FeedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.6rem 0 0.5rem;
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
`;

const CompanyImg = styled.img`
  width: 20px;
  max-height: 20px;
  padding: 0.2rem;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-brand-100)' : 'var(--colors-white-500)'};
  border-radius: var(--borders-radius-base);
  box-shadow: ${({ theme: { isDark } }) =>
    isDark
      ? 'rgba(39, 110, 226, 0.2) 0px 0px 0px 2px, rgba(39, 110, 226, 0.3) 0px 4px 6px -1px, rgba(39, 110, 226, 0.08) 0px 1px 0px inset;'
      : 'rgba(0, 0, 0, 0.16) 0px 1px 4px'};
`;

const BlogTitle = styled(DefaultDIv)`
  display: -webkit-box;
  margin: 0.6rem 0 0.5rem;
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

const BlogWrapper = styled(Card)`
  width: 100%;
  margin: 0rem;
  padding: 1rem 3rem;
`;

const BookmarkFeedListItem = ({
  title,
  content,
  tags,
  keywords,
  url,
  companyName,
  createdAt,
  logoSrc,
}: IBookmarkFeed) => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <Wrapper>
      <BlogWrapper>
        <FeedHeader>
          <LinkWrapper url={url}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <CompanyImg src={logoSrc} alt={companyName} />
              <MiniTitle
                sizeType="xl"
                textAlign="left"
                margin="0 0 0 0.5rem"
                style={{ fontSize: 'var(--fonts-body-base)' }}
              >
                {companyName}
              </MiniTitle>
              <Paragraph sizeType="xm" style={{ marginLeft: '0.25rem' }}>
                · {createdAt}
              </Paragraph>
            </div>
          </LinkWrapper>
        </FeedHeader>

        <BlogTitle>
          <LinkWrapper url={url}>
            <MiniTitle
              sizeType="xl"
              color={isDark ? 'var(--colors-white-500)' : 'var(--colors-dark-500)'}
              textAlign="left"
            >
              {title}
            </MiniTitle>
          </LinkWrapper>
        </BlogTitle>

        <FeedBody>
          <LinkWrapper url={url}>
            <Paragraph
              sizeType="base"
              color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
            >
              {content}
            </Paragraph>
          </LinkWrapper>
        </FeedBody>

        <FeedFooter>
          <FeedTag tags={tags.length === 0 ? keywords : tags} />
        </FeedFooter>
      </BlogWrapper>
    </Wrapper>
  );
};

export default BookmarkFeedListItem;
