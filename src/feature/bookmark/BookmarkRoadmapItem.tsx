// import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { IBookmarkRoadMap } from '../../interface/bookmark';
// import { postBookmark, putBookmark } from '../../apis/bookmark/bookmark';
import { Div, Paragraph, MiniTitle, Button } from '../../components';

const ItemWrapper = styled(Div)`
  display: flex;
  align-items: center;
  width: 460px;
  padding: 1.5rem 2rem;
  margin: 1rem;
`;

const Img = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-right: 1.5rem;
`;

const BookmarkWrapper = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SubText = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
`;

const Line = styled.div`
  width: 250px;
  border-bottom: 1px ${({ theme }) => theme.borderColor} solid;
  margin: 0.5rem 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;

  h3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0.1rem 0 0.5rem;
  }
`;

const BookmarkRoadmapItem = ({
  author,
  title,
  tag,
  likeCount,
  createdAt,
  updatedAt,
}: Partial<IBookmarkRoadMap>) => {
  return (
    <ItemWrapper>
      {author?.profileImage ? (
        <Img src={author.profileImage} alt={author.userName} />
      ) : (
        <Img src={new URL(`/src/assets/favicon.ico`, import.meta.url).href} alt="d" />
      )}

      <InfoWrapper>
        <BookmarkWrapper>
          <Paragraph sizeType="lg" fontWeight="500">
            {author?.userName}
          </Paragraph>
        </BookmarkWrapper>
        <SubText sizeType="sm">
          {author?.companyName === 'default' ? author?.companyName : '지니가던 개발자'}
        </SubText>
        <Line />
        <MiniTitle sizeType="xl" fontWeight="600">
          {title}
        </MiniTitle>
        <Button designType="purpleFill" fontSize="var(--fonts-body-xm)" padding="2.2px 10px">
          {tag}
        </Button>
      </InfoWrapper>
    </ItemWrapper>
  );
};

export default BookmarkRoadmapItem;
