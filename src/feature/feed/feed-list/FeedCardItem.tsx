import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Card, MiniTitle } from '../../../components';
import { IconBookmarkEmpty, IconBookmarkFill } from '../../../components/icons/Icons';
import FeedTag from '../FeedTag';
import { isLoggedInState, toastState } from '../../../recoil';
import { postFeedRead } from '../../../apis/feed/feed';
import { postBookmark, putBookmark } from '../../../apis/bookmark/bookmark';
import { COMPANY } from '../../../constant/company';
import { IFeedItemProps } from '../../../interface/feed';
import { media } from '../../../utils/media';

const BookmarkButton = styled.button`
  display: flex;
  svg {
    cursor: pointer;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
    padding: 0.2rem;
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-brand-100)' : 'var(--colors-white-500)'};
    border-radius: var(--borders-radius-base);
    box-shadow: ${({ theme: { isDark } }) =>
      isDark
        ? 'rgba(39, 110, 226, 0.2) 0px 0px 0px 2px, rgba(39, 110, 226, 0.3) 0px 4px 6px -1px, rgba(39, 110, 226, 0.08) 0px 1px 0px inset;'
        : 'rgba(0, 0, 0, 0.16) 0px 1px 4px'};
  }
  button:hover ${MiniTitle} {
    color: var(--colors-brand-500);
    transition: color 0.3s ease-in;
  }
`;

const CardDiv = styled.div`
  /* 한 줄 자르기 */
  display: inline-block;
  width: 98%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.8;
  height: 3.6rem;
  text-align: left;
  word-wrap: break-word;
  -webkit-line-clamp: 2; // 2줄로
  -webkit-box-orient: vertical;
`;

const CardBody = styled(CardDiv)`
  display: -webkit-box;
  margin-bottom: 1rem;
`;

const CardFooter = styled(CardDiv)`
  line-height: 1.3;
  height: 3.4rem;
`;

const FeedThumbnailImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8.4rem;
  border-radius: var(--borders-radius-base);
  overflow: hidden;
  margin-bottom: 0.8rem;
  background: var(--colors-brand-200);
`;

const FeedThumbnailImgChild = styled.div<{ image: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: var(--borders-radius-base);
`;

const StyledCard = styled(Card)`
  margin: 0.5rem 0rem 1rem 0.5rem;
  padding: 1rem 1rem;
  &:hover {
    box-shadow: ${({ theme: { isDark } }) =>
      isDark
        ? 'rgba(59, 130, 246, 0.16) 0px 3px 6px, rgba(59, 130, 246, 0.23) 0px 3px 6px'
        : 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'};
    translate: 1px 1px;
    /* ${CardBody} > h3 {
      color: var(--colors-brand-500);
      transition: color 0.3s ease-in;
    } */
  }
  ${media.phone`
    min-width: unset;
    width: 90%;
  `}
`;

const FeedCardItem = ({
  id,
  title,
  companyName,
  logoSrc,
  tags,
  url,
  isBookmarked,
  thumbnailImage,
  keywords,
}: IFeedItemProps) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [toast, setToast] = useRecoilState(toastState);

  const queryClient = useQueryClient();

  const unBookmark = useMutation(putBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries('feed');
    },
  });

  const bookmark = useMutation(postBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries('feed');
    },
  });

  const onClickBookmarkHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setToast({
        type: 'negative',
        isVisible: true,
        message: '로그인 후 북마크를 이용해보세요! ',
      });
    } else if (isBookmarked) {
      unBookmark.mutate({ id, type: 'FEED' });
      setToast({
        type: 'positive',
        message: '북마크에서 제거되었습니다.',
        isVisible: true,
      });
    } else {
      bookmark.mutate({ id, type: 'FEED' });
      setToast({
        type: 'positive',
        message: '북마크에 추가되었습니다.',
        isVisible: true,
      });
    }
  };

  const navigate = useNavigate();
  const onClickCompanyHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(`/profile/company/${COMPANY[companyName]}`);
  };

  let newThumbnailImage: string = thumbnailImage;
  if (thumbnailImage.startsWith('/assets')) {
    const urlArray = url.split('/');
    newThumbnailImage = `https://${urlArray[2]}${thumbnailImage}`;
  }

  return (
    <a href={`${url}`} target="_blank" rel="noreferrer">
      <StyledCard
        width="274px"
        onClick={() => {
          if (isLoggedIn) postFeedRead({ feedId: id });
        }}
      >
        <CardHeader>
          <button
            type="button"
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
            onClick={onClickCompanyHandler}
          >
            <img
              src={
                logoSrc !== 'http://www.cntechcorp.co.kr/favicon.ico'
                  ? logoSrc
                  : 'https://raw.githubusercontent.com/trycatch-ssafy/logo/main/cntech-systems.png'
              }
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
          </button>
          <BookmarkButton onClick={onClickBookmarkHandler}>
            {/* 북마크 */}
            {isBookmarked && <IconBookmarkFill size="22" color="var(--colors-brand-500)" />}
            {isBookmarked || <IconBookmarkEmpty size="22" color="var(--colors-brand-500)" />}
          </BookmarkButton>
        </CardHeader>

        <FeedThumbnailImg>
          <FeedThumbnailImgChild image={newThumbnailImage} />
        </FeedThumbnailImg>

        <CardBody>
          <MiniTitle
            sizeType="xl"
            textAlign="left"
            margin="0.2rem 0 0 0"
            style={{ fontSize: 'var(--fonts-body-base)' }}
          >
            {title}
          </MiniTitle>
        </CardBody>
        <CardFooter>
          <FeedTag tags={tags.length === 0 ? keywords : tags} />
        </CardFooter>
      </StyledCard>
    </a>
  );
};

export default FeedCardItem;
