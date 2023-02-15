import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { IFeedItem } from '../../../interface/feed';
import { isDarkState } from '../../../recoil';
import { Paragraph, MiniTitle } from '../../../components';
import FeedTag from '../../feed/FeedTag';
import getImageUrl from '../../../utils/getImageUrl';
import { COMPANY } from '../../../constant/company';
import elapsedTime from '../../../utils/elapsed-time';

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
  margin-bottom: 0.75rem;
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

const CompanyImg = styled.img`
  width: 24px;
  max-height: 24px;
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
}

const LinkWrapper = ({ children, url }: LinkProps) => {
  return (
    <a href={`${url}`} target="_blank" rel="noreferrer" style={{ zIndex: '1' }}>
      {children}
    </a>
  );
};

const RecentListItem = ({
  feedId,
  title,
  summary,
  companyName,
  createdAt,
  url,
  thumbnailImage,
  tags,
  keywords,
  isBookmarked,
}: IFeedItem) => {
  const isDark = useRecoilValue(isDarkState);
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
        <LinkWrapper url={url}>
          <FeedThumbnailImgWrapper>
            <FeedThumbnailImg image={thumbnailImage} />
          </FeedThumbnailImgWrapper>
        </LinkWrapper>
      </div>

      <BlogWrapper>
        <FeedHeader>
          <LinkWrapper url={url}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <CompanyImg
                src={getImageUrl(COMPANY[companyName], 'logo', 'png')}
                alt={companyName}
              />
              <MiniTitle
                sizeType="xl"
                textAlign="left"
                margin="0 0 0 0.5rem"
                style={{ fontSize: 'var(--fonts-body-base)' }}
              >
                {companyName}
              </MiniTitle>
              <Paragraph sizeType="xm" style={{ marginLeft: '0.25rem' }}>
                · {elapsedTime(createdAt)}
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
              style={{ width: '510px' }}
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
              style={{ width: '510px' }}
            >
              {summary}
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

export default RecentListItem;
