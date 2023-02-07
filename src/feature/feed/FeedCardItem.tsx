import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { Card, MiniTitle } from '../../components';
import getImageUrl from '../../utils/getImageUrl';
import { IconBookmarkEmpty, IconBookmarkFill } from '../../components/icons/Icons';
import { IFeedItemProps } from './IFeed';
import FeedTag from './FeedTag';
import { COMPANY } from '../../constant/company';
import { isDarkState } from '../../recoil';

const Icons = styled.button`
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
    max-height: 30px;
    padding: 0.2rem;
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-brand-100)' : 'var(--colors-white-500)'};
    border-radius: var(--borders-radius-base);
    box-shadow: ${({ theme: { isDark } }) =>
      isDark
        ? 'rgba(39, 110, 226, 0.2) 0px 0px 0px 2px, rgba(39, 110, 226, 0.3) 0px 4px 6px -1px, rgba(39, 110, 226, 0.08) 0px 1px 0px inset;'
        : 'rgba(0, 0, 0, 0.16) 0px 1px 4px'};
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

const FeedCardItem = ({
  title,
  companyName,
  tags,
  url,
  isBookmarked,
  thumbnailImage,
  keywords,
}: IFeedItemProps) => {
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

  const isDark = useRecoilValue(isDarkState);

  return (
    <Card
      // width="32%"
      width="274px"
      // height="21.875rem"
      as="a"
      style={{ margin: '0.5rem 0rem 1rem 0.5rem', padding: '1rem 1rem' }}
      href={`${url}`}
      target="_blank"
      rel="noreferrer"
    >
      <CardHeader>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img
            src={companyName && getImageUrl(COMPANY[companyName], 'logo', 'png')}
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
        </div>
        <Icons onClick={handleClick}>
          {/* 북마크 */}
          {bookMarkIcon && <IconBookmarkFill size="22" color="var(--colors-brand-500)" />}
          {bookMarkIcon || <IconBookmarkEmpty size="22" color="var(--colors-brand-500)" />}
        </Icons>
      </CardHeader>

      <FeedThumbnailImg>
        <FeedThumbnailImgChild image={thumbnailImage} />
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
    </Card>
  );
};

export default FeedCardItem;
