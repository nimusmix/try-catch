import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, MiniTitle, Paragraph } from '../../components';
import getImageUrl from '../../utils/getImageUrl';
import { IconBookmarkEmpty, IconBookmarkFill } from '../../components/icons/Icons';
import { IFeedItemProps } from './IFeed';
import FeedTag from './FeedTag';
import { COMPANY } from '../../constant/company';

const Icons = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  svg {
    margin-left: 0.6rem;
    cursor: pointer;
  }
  z-index: 2;
  transform: translate(12rem, -1.9rem);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  img {
    width: 44px;
    padding: 0.2rem;
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-brand-100)' : 'var(--colors-white-500)'};
    border-radius: var(--borders-radius-lg);
    box-shadow: ${({ theme: { isDark } }) =>
      isDark
        ? 'rgba(39, 110, 226, 0.2) 0px 0px 0px 2px, rgba(39, 110, 226, 0.3) 0px 4px 6px -1px, rgba(39, 110, 226, 0.08) 0px 1px 0px inset;'
        : 'rgba(0, 0, 0, 0.16) 0px 1px 4px'};
    translate: 0.5rem;
  }
`;

const CardBody = styled.div`
  margin-bottom: 0.75rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const FeedThumbnailImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 122%;
  height: 10.625rem;
  border-radius: var(--borders-radius-base);
  transform: translate(-1.5rem, -1rem);
  overflow: hidden;
  margin: 0ch;
`;

const FeedThumbnailImgChild = styled.div<{ image: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: var(--borders-radius-base);
  &:hover {
    transform: scale(1.3);
  }
`;

const FeedCardItem = ({
  title,
  summary,
  companyName,
  tags,
  url,
  isBookmarked,
  thumbnailImage,
  keywords,
  checkedItemsProps,
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
  return (
    <Card
      width="32%"
      // height="21.875rem"
      as="a"
      style={{ margin: '0.5rem 0rem 1rem 0.7rem', padding: '1rem 1.5rem' }}
      href={`${url}`}
      target="_blank"
      rel="noreferrer"
    >
      <Icons onClick={handleClick}>
        {/* 북마크 */}
        {bookMarkIcon && <IconBookmarkFill size="30" color="var(--colors-brand-500)" />}
        {bookMarkIcon || <IconBookmarkEmpty size="30" color="var(--colors-brand-500)" />}
      </Icons>
      <FeedThumbnailImg>
        <FeedThumbnailImgChild image={thumbnailImage} />
      </FeedThumbnailImg>

      <CardHeader>
        <MiniTitle sizeType="xl" textAlign="left" margin="0.2rem 0 0 0">
          {title.length > 22 ? `${title.slice(0, 22)}...` : title}
        </MiniTitle>
        <img
          src={companyName && getImageUrl(COMPANY[companyName], 'logo', 'png')}
          style={{ maxHeight: '45px' }}
          alt={companyName}
        />
      </CardHeader>
      <CardBody>
        <Paragraph sizeType="base" textAlign="left">
          {summary.length > 30 ? `${summary.slice(0, 30)}...` : summary}
        </Paragraph>
      </CardBody>
      <CardFooter>
        <FeedTag checkedItems={checkedItemsProps} tags={tags.length === 0 ? keywords : tags} />
      </CardFooter>
    </Card>
  );
};

export default FeedCardItem;
