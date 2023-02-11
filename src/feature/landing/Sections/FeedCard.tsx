import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { Card, MiniTitle } from '../../../components';
import { IFeedItemProps } from '../../feed/IFeed';
import FeedTag from '../../feed/FeedTag';

const fadeUp = keyframes`
  0% {
    filter: alpha(opacity=0);
    opacity: .1;
    transform: translateY(100px);
  }
  100% {
    filter: alpha(opacity=100);
    opacity: 1;
    transform: translateY(0);
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
  visibility: hidden;

  &.active {
    visibility: visible;
    animation: ${fadeUp} 1s;
  }
  margin: 0.5rem 0rem 1rem 0.5rem;
  padding: 1rem 1rem;
  &:hover {
    box-shadow: ${({ theme: { isDark } }) =>
      isDark
        ? 'rgba(59, 130, 246, 0.16) 0px 3px 6px, rgba(59, 130, 246, 0.23) 0px 3px 6px'
        : 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'};
    translate: 1px 1px;
  }
`;

const FeedCard = ({
  id,
  title,
  companyName,
  logoSrc,
  tags,
  url,
  isBookmarked,
  thumbnailImage,
  keywords,
  delay,
}: IFeedItemProps & { delay: number }) => {
  const { ref, inView } = useInView();
  const [show, setShow] = useState(false);

  setTimeout(() => {
    if (inView) {
      setShow(true);
    }
  }, delay);

  useEffect(() => {
    if (!inView) {
      setShow(false);
    }
  }, [inView, setShow]);
  return (
    <StyledCard
      width="17.125rem"
      as="a"
      href={`${url}`}
      target="_blank"
      rel="noreferrer"
      ref={ref}
      className={show ? 'active' : ''}
    >
      <CardHeader>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img src={logoSrc} alt={companyName} />
          <MiniTitle
            sizeType="xl"
            textAlign="left"
            margin="0 0 0 0.5rem"
            style={{ fontSize: 'var(--fonts-body-base)' }}
          >
            {companyName}
          </MiniTitle>
        </div>
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
    </StyledCard>
  );
};

export default FeedCard;
