import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { postBookmark, putBookmark } from '../../apis/bookmark/bookmark';
import { Div, Paragraph, MiniTitle, Button } from '../../components';
import { IconBookmarkEmpty, IconBookmarkFill } from '../../components/icons/Icons';

interface IRoadmapItemProps {
  roadmapId: number;
  author: {
    userId: number;
    userName: string;
    profileImage?: string;
    companyName?: string;
    isFollowed: boolean;
  };
  title: string;
  tag: string;
  isBookmarked: boolean;
}

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

const Bookmark = styled.div`
  display: flex;
  svg {
    cursor: pointer;
  }
`;

const RoadmapListItem = ({ roadmap }: { roadmap: IRoadmapItemProps }) => {
  const queryClient = useQueryClient();

  const unBookmark = useMutation(putBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(['roadmapList']);
    },
  });

  const bookmark = useMutation(postBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(['roadmapList']);
    },
  });

  const onClickBookmarkHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (roadmap.isBookmarked) {
      unBookmark.mutate({ id: roadmap.roadmapId, type: 'ROADMAP' });
    } else {
      bookmark.mutate({ id: roadmap.roadmapId, type: 'ROADMAP' });
    }
  };

  return (
    <ItemWrapper>
      {roadmap.author.profileImage ? (
        <Img src={roadmap.author.profileImage} alt={roadmap.author.userName} />
      ) : (
        <Img src={new URL(`/src/assets/favicon.ico`, import.meta.url).href} alt="d" />
      )}

      <InfoWrapper>
        <BookmarkWrapper>
          <Paragraph sizeType="lg" fontWeight="500">
            {roadmap.author.userName}
          </Paragraph>
          {/* 북마크 */}
          <Bookmark onClick={onClickBookmarkHandler}>
            {roadmap.isBookmarked && <IconBookmarkFill size="24" color="var(--colors-brand-500)" />}
            {roadmap.isBookmarked || (
              <IconBookmarkEmpty size="24" color="var(--colors-brand-500)" />
            )}
          </Bookmark>
        </BookmarkWrapper>
        <SubText sizeType="sm">{roadmap.author.companyName || '지니가던 개발자'}</SubText>
        <Line />
        <MiniTitle sizeType="xl" fontWeight="600">
          {roadmap.title}
        </MiniTitle>
        <Button designType="purpleFill" fontSize="var(--fonts-body-xm)" padding="2.2px 10px">
          {roadmap.tag}
        </Button>
      </InfoWrapper>
    </ItemWrapper>
  );
};

export default RoadmapListItem;
