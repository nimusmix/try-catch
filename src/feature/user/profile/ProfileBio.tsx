import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import styled from 'styled-components';
import { getName } from '../../../apis/auth/auth';
import { getUserDetail, getUserId } from '../../../apis/profile/profile';
import { Button, MiniTitle, Modal, Paragraph } from '../../../components';
import { IUserDetail } from '../../../interface/user';
import isMyself from '../../../utils/isMyself';
import { isLoggedInState, toastState } from '../../../recoil';
import { postFollow, putFollow } from '../../../apis/user/user';

const BioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
    display: flex;
    align-items: center;
    margin: 0.25rem 0;
  }
`;

const ProfileImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: var(--borders-radius-round);
  box-shadow: var(--shadows-black-lg);
  margin-bottom: 20px;
`;

const CompanyImg = styled.img`
  width: 1.725rem;
  height: 1.725rem;
  border-radius: var(--borders-radius-base);
  box-shadow: var(--shadows-black-md);
  margin-right: 0.5rem;
`;

const Wrapper = styled.div`
  align-items: center;
  p {
    margin-right: 1.25rem;
  }
  & :first-child {
    margin-right: 0.5rem;
  }
`;

const Tag = styled(Button)`
  color: var(--colors-brand-500);
  border-radius: var(--borders-radius-lg);
  margin-right: 0.725rem;
`;

const Introduction = styled.div`
  padding: 3rem 0;
`;

const ProfileBio = ({ changeFn }: any) => {
  const { userName } = useParams();
  const { data: userId } = useQuery<number>(['profileBio', 'userId'] as const, () =>
    getUserId(userName!)
  );

  const { data: user } = useQuery<IUserDetail>(
    ['userDetail'] as const,
    () => getUserDetail(userId!),
    {
      enabled: !!userId,
    }
  );

  const { data: loginedUserName } = useQuery(['loginedUserName'] as const, getName);
  const isMine = isMyself(loginedUserName, userName!);
  changeFn(isMine);

  // 로그인 여부 (모달 띄우기 방지 위함)
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [toast, setToast] = useRecoilState(toastState);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const modalClick = (e: React.MouseEvent<HTMLElement>) => {
    if (isLoggedIn) {
      setIsModalOpened(true);
    } else {
      setToast({ type: 'negative', message: '로그인 후 이용하실 수 있습니다.', isVisible: true });
    }
  };

  const createImageUrl = (companyName: string) => {
    return new URL(`/src/assets/logo/${companyName}.png`, import.meta.url).href;
  };

  const queryClient = useQueryClient();
  const updateFollow = (type: 'post' | 'put') => {
    const prevData = queryClient.getQueryData(['userDetail']);

    if (prevData) {
      queryClient.setQueryData<IUserDetail>(['userDetail'], (oldData: any) => {
        return {
          ...oldData,
          isFollowed: type === 'post',
          followerCount: type === 'post' ? oldData.followerCount + 1 : oldData.followerCount - 1,
        };
      });
    }

    return { prevData };
  };

  const { mutate: follow } = useMutation(['post', 'follow'], () => postFollow(userId!), {
    onMutate: () => updateFollow('post'),
  });
  const { mutate: unfollow } = useMutation(['put', 'follow'], () => putFollow(userId!), {
    onMutate: () => updateFollow('put'),
  });

  const clickFollowBtn = () => {
    if (user?.isFollowed) {
      unfollow();
    } else {
      follow();
    }
  };

  return (
    <>
      <BioWrapper>
        <InfoWrapper>
          <ProfileImg src={user?.profileImg} />
          <div>
            {user?.companyName && <CompanyImg src={createImageUrl(user.companyName)} />}
            <MiniTitle sizeType="3xl">{user?.userName}</MiniTitle>
          </div>
          <div>
            <Link to="subscription">
              <Wrapper onClick={modalClick}>
                <Paragraph sizeType="lg">구독</Paragraph>
                <Paragraph sizeType="lg" fontWeight="600">
                  {user?.subscriptionCount}
                </Paragraph>
              </Wrapper>
            </Link>

            <Link to="following">
              <Wrapper onClick={modalClick}>
                <Paragraph sizeType="lg">팔로잉</Paragraph>
                <Paragraph sizeType="lg" fontWeight="600">
                  {user?.followingCount}
                </Paragraph>
              </Wrapper>
            </Link>

            <Link to="followers">
              <Wrapper onClick={modalClick}>
                <Paragraph sizeType="lg">팔로워</Paragraph>
                <Paragraph sizeType="lg" fontWeight="600">
                  {user?.followerCount}
                </Paragraph>
              </Wrapper>
            </Link>
          </div>
          <div>
            {user?.tags.map((tag) => (
              <Tag key={tag} designType="skyFill">
                {tag}
              </Tag>
            ))}
          </div>
        </InfoWrapper>

        {isMine ? (
          <Link to="/profile/edit">
            <Button
              designType="blueEmpty"
              padding="0.25rem 1rem"
              borderRadius="var(--borders-radius-lg)"
            >
              프로필 편집
            </Button>
          </Link>
        ) : (
          <Button
            designType={user?.isFollowed ? 'blueFill' : 'blueEmpty'}
            padding="0.25rem 1rem"
            borderRadius="var(--borders-radius-lg)"
            onClick={clickFollowBtn}
          >
            {user?.isFollowed ? '팔로잉' : '팔로우'}
          </Button>
        )}
      </BioWrapper>

      {/* 모달 */}
      {isModalOpened ? (
        <Modal width="420px" height="380px" onClose={setIsModalOpened}>
          <Outlet />
        </Modal>
      ) : null}

      {user?.introduction && (
        <Introduction>
          <Paragraph sizeType="lg">{user?.introduction}</Paragraph>
        </Introduction>
      )}
    </>
  );
};

export default ProfileBio;
