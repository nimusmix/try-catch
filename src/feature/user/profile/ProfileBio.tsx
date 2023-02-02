import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getUserDetail, getUserId } from '../../../apis/profile/profile';
import { MiniTitle, Paragraph, Button, Modal } from '../../../components';
import { IUserDetail } from '../../../interface/user';

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

const ProfileBio = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const modalClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpened(true);
  };
  const { userName } = useParams();
  const { data: userId } = useQuery<number>(['userId'], () => getUserId(userName!));
  const { data: user } = useQuery<IUserDetail>(['userDetail'], () => getUserDetail(userId!), {
    enabled: !!userId,
  });

  const createImageUrl = (companyName: string) => {
    return new URL(`/src/assets/logo/${companyName}.png`, import.meta.url).href;
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
        {user?.isFollowed && (
          <Button padding="0.25rem 1rem" borderRadius="var(--borders-radius-lg)">
            팔로잉
          </Button>
        )}
        {user?.isFollowed || (
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
          <Outlet />
        </Modal>
      ) : null}

      <Introduction>
        <Paragraph sizeType="lg">{user?.introduction}</Paragraph>
      </Introduction>
    </>
  );
};

export default ProfileBio;
