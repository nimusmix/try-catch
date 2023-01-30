import React, { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { MiniTitle, Paragraph, Button, Modal } from '../../../components';
import { SubscriptionPage, FollowingPage, FollowersPage } from '../../../pages';

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

const MUser = {
  userId: 1,
  userName: 'nimusmix',
  profileImage: 'https://avatars.githubusercontent.com/u/109320569?v=4',
  companyName: '지바이크',
  subscriptions: [],
  subscriptionCount: 0,
  followings: [],
  followingCount: 0,
  followers: [],
  followerCount: 0,
  introduction: '싸피 2학기 공통 프로젝트 진행 중입니다. 아주 대단한 프로젝트예요.',
  tags: ['React', 'TypeScript'],
  questions: [],
  answers: [],
  recentFeeds: [],
  history: [],
  isFollowed: false,
};

const ProfileBio = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const subscriptionMatch = useMatch('profile/:username/subscription');
  const followingMatch = useMatch('profile/:username/following');
  const followersMatch = useMatch('profile/:username/followers');
  const modalClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpened(true);
  };

  const createImageUrl = (companyName: string) => {
    return new URL(`/src/assets/logo/${companyName}.png`, import.meta.url).href;
  };

  return (
    <>
      <BioWrapper>
        <InfoWrapper>
          <ProfileImg src={MUser.profileImage} />
          <div>
            {MUser.companyName && <CompanyImg src={createImageUrl(MUser.companyName)} />}
            <MiniTitle sizeType="3xl">{MUser.userName}</MiniTitle>
          </div>
          <div>
            <Link to="subscription">
              <Wrapper onClick={modalClick}>
                <Paragraph sizeType="lg">구독</Paragraph>
                <Paragraph sizeType="lg" fontWeight="600">
                  {MUser.subscriptionCount}
                </Paragraph>
              </Wrapper>
            </Link>

            <Link to="following">
              <Wrapper onClick={modalClick}>
                <Paragraph sizeType="lg">팔로잉</Paragraph>
                <Paragraph sizeType="lg" fontWeight="600">
                  {MUser.followingCount}
                </Paragraph>
              </Wrapper>
            </Link>

            <Link to="followers">
              <Wrapper onClick={modalClick}>
                <Paragraph sizeType="lg">팔로워</Paragraph>
                <Paragraph sizeType="lg" fontWeight="600">
                  {MUser.followerCount}
                </Paragraph>
              </Wrapper>
            </Link>
          </div>
          <div>
            {MUser.tags.map((tag) => (
              <Tag key={tag} designType="skyFill">
                {tag}
              </Tag>
            ))}
          </div>
        </InfoWrapper>
        {MUser.isFollowed && (
          <Button padding="0.25rem 1rem" borderRadius="var(--borders-radius-lg)">
            팔로잉
          </Button>
        )}
        {MUser.isFollowed || (
          <Button
            designType="blueEmpty"
            padding="0.25rem 1rem"
            borderRadius="var(--borders-radius-lg)"
          >
            팔로우
          </Button>
        )}
      </BioWrapper>

      {/* 모달 */}
      {isModalOpened ? (
        <Modal width="420px" height="380px" onClose={setIsModalOpened}>
          {subscriptionMatch && <SubscriptionPage />}
          {followingMatch && <FollowingPage />}
          {followersMatch && <FollowersPage />}
        </Modal>
      ) : null}

      <Introduction>
        <Paragraph sizeType="lg">{MUser.introduction}</Paragraph>
      </Introduction>
    </>
  );
};

export default ProfileBio;
