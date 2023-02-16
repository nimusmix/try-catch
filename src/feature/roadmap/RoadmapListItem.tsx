import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { IconBookmarkEmpty, IconBookmarkFill, IconLikeEmpty } from '../../components/icons/Icons';
import { postBookmark, putBookmark } from '../../apis/bookmark/bookmark';
import { Div, Paragraph, MiniTitle, Button, Card } from '../../components';
import { isDarkState, isLoggedInState, toastState } from '../../recoil';

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
  isLiked: boolean;
  likeCount: number;
  createdAt: number;
  updatedAt: number;
}

const ItemWrapper = styled(Card)`
  display: flex;
  align-items: center;
  width: 460px;
  padding: 1.5rem 2rem;
  margin: 0.5rem;
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
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0.1rem 0 0.5rem;
  }
`;

const BookmarkButton = styled.div`
  display: flex;
  svg {
    cursor: pointer;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0 0.25rem;
  }
`;

const RoadmapListItem = ({ roadmap }: { roadmap: IRoadmapItemProps }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [toast, setToast] = useRecoilState(toastState);

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
    if (!isLoggedIn) {
      setToast({
        type: 'negative',
        isVisible: true,
        message: '로그인 후 북마크를 이용해보세요! ',
      });
    } else if (roadmap.isBookmarked) {
      unBookmark.mutate({ id: roadmap.roadmapId, type: 'ROADMAP' });
      setToast({
        type: 'positive',
        message: '북마크에서 제거되었습니다.',
        isVisible: true,
      });
    } else {
      bookmark.mutate({ id: roadmap.roadmapId, type: 'ROADMAP' });
      setToast({
        type: 'positive',
        message: '북마크에 추가되었습니다.',
        isVisible: true,
      });
    }
  };

  const isDark = useRecoilValue(isDarkState);

  const navigate = useNavigate();

  const goToProfile = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate(`/profile/${roadmap.author.userName}`);
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
          <Paragraph sizeType="lg" fontWeight="500" onClick={goToProfile}>
            {roadmap.author.userName}
          </Paragraph>
          {/* 북마크 */}
          <BookmarkButton onClick={onClickBookmarkHandler}>
            {roadmap.isBookmarked && <IconBookmarkFill size="24" color="var(--colors-brand-500)" />}
            {roadmap.isBookmarked || (
              <IconBookmarkEmpty size="24" color="var(--colors-brand-500)" />
            )}
          </BookmarkButton>
        </BookmarkWrapper>
        <SubText sizeType="sm">{roadmap.author.companyName || '지니가던 개발자'}</SubText>
        <Line />
        <MiniTitle sizeType="xl" fontWeight="600">
          {roadmap.title}
        </MiniTitle>

        <BottomWrapper>
          <Button designType="purpleFill" fontSize="var(--fonts-body-xm)" padding="2.2px 10px">
            {roadmap.tag}
          </Button>

          <LikeWrapper>
            <IconLikeEmpty
              size={14}
              color={isDark ? 'var(--colors-white-100)' : 'var(--colors-black-100)'}
            />
            <Paragraph sizeType="sm">{roadmap.likeCount}</Paragraph>
          </LikeWrapper>
        </BottomWrapper>
      </InfoWrapper>
    </ItemWrapper>
  );
};

export default RoadmapListItem;
