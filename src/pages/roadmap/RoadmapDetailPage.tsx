import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';
import { Button, MiniTitle, Paragraph, SubTitle } from '../../components';
import { IRoadmap } from '../../interface/roadmap';
import { getRoadmapDetail } from '../../apis/roadmap/roadmap';
import { Layout } from '../../layout';
import RoadmapDetailBody from '../../feature/roadmap/RoadmapDetailBody';
import {
  IconArrowBack,
  IconLikeEmpty,
  IconLikeFill,
  IconBookmarkEmpty,
  IconBookmarkFill,
} from '../../components/icons/Icons';
import { cancelLike, postLike } from '../../apis/like/like';
import { isLoggedInState, toastState } from '../../recoil';
import { postFollow, putFollow } from '../../apis/user/user';
import { putBookmark, postBookmark } from '../../apis/bookmark/bookmark';
import { getName } from '../../apis/auth/auth';
import isMyself from '../../utils/isMyself';
import RoadmapDeleteModal from '../../feature/roadmap/RoadmapDeleteModal';

const RoadmapDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 800px;
  margin: 3rem auto;

  h2 {
    margin: 0.725rem 0;
  }

  & > svg {
    cursor: pointer;
    color: ${({ theme }) => theme.textColor100};
  }
`;

const Img = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const SubText = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
`;

const TitleBookmarkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  svg {
    width: 2rem;
    height: 2rem;
    color: var(--colors-brand-500);
  }
`;

const BookmarkIcon = styled.span`
  cursor: pointer;
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0.5rem 0 2rem;
`;

const UserInfoWrapper = styled.div`
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem auto 1rem;
  cursor: pointer;

  svg {
    margin-right: 0.25rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const RoadmapDetailPage = () => {
  const { userName } = useParams();
  const queryClient = useQueryClient();

  const { data: roadmapDetail, isLoading } = useQuery<IRoadmap>(
    ['roadmap', userName] as const,
    () => getRoadmapDetail(userName!),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['roadmap', userName]);
      },
    }
  );

  const { data: myName } = useQuery<string>(['myName'], () => getName());
  const isMine = isMyself(myName!, userName!);

  const navi = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [toast, setToast] = useRecoilState(toastState);

  const updateLike = (type: 'up' | 'down') => {
    const prevData = queryClient.getQueryData(['roadmap', userName]);

    if (prevData) {
      queryClient.setQueryData<IRoadmap>(['roadmap', userName], (oldData: any) => {
        return {
          ...oldData,
          likeCount: type === 'up' ? roadmapDetail!.likeCount + 1 : roadmapDetail!.likeCount - 1,
          isLiked: type === 'up',
        };
      });
    }

    return {
      prevData,
    };
  };

  const { mutate: like } = useMutation(
    ['like', 'up'],
    () => postLike({ id: roadmapDetail!.roadmapId, type: 'ROADMAP' }),
    {
      onMutate: () => updateLike('up'),
    }
  );

  const { mutate: cancel } = useMutation(
    ['like', 'down'],
    () => cancelLike({ id: roadmapDetail!.roadmapId, type: 'ROADMAP' }),
    {
      onMutate: () => updateLike('down'),
    }
  );

  const onClickLikeHandler = () => {
    if (!isLoggedIn) {
      setToast({ type: 'negative', message: '로그인 후 이용하실 수 있습니다.', isVisible: true });
      return;
    }
    if (roadmapDetail?.isLiked) {
      cancel();
    } else {
      like();
    }
  };

  const updateFollow = (type: 'post' | 'put') => {
    const prevData = queryClient.getQueryData(['roadmap', userName]);

    if (prevData) {
      queryClient.setQueryData<IRoadmap>(['roadmap', userName], (oldData: any) => {
        return {
          ...oldData,
          author: {
            userId: roadmapDetail!.author.userId,
            userName: roadmapDetail!.author.userName,
            profileImage: roadmapDetail!.author.profileImage,
            companyName: roadmapDetail!.author.companyName,
            isFollowed: type === 'post',
          },
        };
      });
    }

    return { prevData };
  };

  const { mutate: follow } = useMutation(
    ['post', 'follow'],
    () => postFollow(roadmapDetail!.author.userId!),
    {
      onMutate: () => updateFollow('post'),
    }
  );

  const { mutate: unfollow } = useMutation(
    ['put', 'follow'],
    () => putFollow(roadmapDetail!.author.userId!),
    {
      onMutate: () => updateFollow('put'),
    }
  );

  const onClickFollowHandler = () => {
    if (!isLoggedIn) {
      setToast({ type: 'negative', message: '로그인 후 이용하실 수 있습니다.', isVisible: true });
      return;
    }

    if (roadmapDetail?.author.isFollowed) {
      unfollow();
    } else {
      follow();
    }
  };

  const unBookmark = useMutation(putBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(['roadmap', userName]);
    },
  });

  const bookmark = useMutation(postBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(['roadmap', userName]);
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
    } else if (roadmapDetail?.isBookmarked) {
      unBookmark.mutate({ id: roadmapDetail!.roadmapId, type: 'ROADMAP' });
      setToast({
        type: 'positive',
        message: '북마크에서 제거되었습니다.',
        isVisible: true,
      });
    } else {
      bookmark.mutate({ id: roadmapDetail!.roadmapId, type: 'ROADMAP' });
      setToast({
        type: 'positive',
        message: '북마크에 추가되었습니다.',
        isVisible: true,
      });
    }
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (isLoading) {
    return <Paragraph sizeType="base">Loading...</Paragraph>;
  }

  return (
    <Layout>
      <RoadmapDetailWrapper>
        <IconArrowBack onClick={() => navi(-1)} size={24} />
        {/* 태그 */}
        <Button
          as="span"
          designType="purpleFill"
          fontSize="var(--fonts-body-sm)"
          padding="2.2px 10px"
          margin="2rem 0 0 0"
        >
          {roadmapDetail?.tag}
        </Button>

        <TitleBookmarkWrapper>
          <SubTitle>{roadmapDetail?.title}</SubTitle>
          <BookmarkIcon onClick={onClickBookmarkHandler}>
            {roadmapDetail?.isBookmarked && <IconBookmarkFill />}
            {roadmapDetail?.isBookmarked || <IconBookmarkEmpty />}
          </BookmarkIcon>
        </TitleBookmarkWrapper>

        <UserWrapper>
          <UserInfoWrapper>
            <Img src={roadmapDetail?.author.profileImage} />
            <div>
              <MiniTitle sizeType="xl">{roadmapDetail?.author.userName}</MiniTitle>
              <SubText sizeType="base">
                {roadmapDetail?.author.companyName || '지나가던 개발자'}
              </SubText>
            </div>
          </UserInfoWrapper>

          {isMine && (
            <ButtonWrapper>
              <Button
                as={Link}
                to="/roadmap/edit"
                designType="blueEmpty"
                borderRadius="var(--borders-radius-lg)"
                margin="0 0.5rem 0 0"
              >
                수정
              </Button>
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                designType="blueEmpty"
                borderRadius="var(--borders-radius-lg)"
              >
                삭제
              </Button>
            </ButtonWrapper>
          )}

          {/* 팔로우 버튼 */}
          {isMine || (
            <Button
              designType={roadmapDetail?.author.isFollowed ? 'blueFill' : 'blueEmpty'}
              padding="0.25rem 1rem"
              borderRadius="var(--borders-radius-lg)"
              onClick={onClickFollowHandler}
            >
              {roadmapDetail?.author.isFollowed ? '팔로잉' : '팔로우'}
            </Button>
          )}
        </UserWrapper>
        <RoadmapDetailBody nodes={roadmapDetail!.nodes} edges={roadmapDetail!.edges} />

        <LikeWrapper onClick={onClickLikeHandler}>
          {roadmapDetail?.isLiked ? <IconLikeFill /> : <IconLikeEmpty />}
          <Paragraph sizeType="base">{roadmapDetail!.likeCount}</Paragraph>
        </LikeWrapper>
      </RoadmapDetailWrapper>

      {isDeleteModalOpen && <RoadmapDeleteModal />}
    </Layout>
  );
};

export default RoadmapDetailPage;
