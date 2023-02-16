import styled from 'styled-components';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { ISimpleUserData } from '../../../interface/user';
import { Button, Paragraph } from '../../../components';
import getImageUrl from '../../../utils/getImageUrl';
import { COMPANY } from '../../../constant/company';
import { postFollow, putFollow } from '../../../apis/user/user';
import isModalOpenedState from '../../../recoil/isModalOpenedState';

const UserItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const CompanyImg = styled.img`
  width: 1rem;
  height: 1rem;
  border-radius: var(--borders-radius-base);
  margin-left: 0.45rem;
`;

const SimpleUserItem = ({
  userId,
  userName,
  profileImage,
  companyName,
  isFollowed,
}: ISimpleUserData) => {
  const [isFollowedState, setIsFollowedState] = useState(isFollowed);
  const setIsModalOpened = useSetRecoilState(isModalOpenedState);

  const { mutate: follow } = useMutation(['post', 'follow', userName], () => postFollow(userId!));
  const { mutate: unfollow } = useMutation(['put', 'follow', userName], () => putFollow(userId!));

  const followBtnHandler = () => {
    if (isFollowedState) {
      unfollow();
    } else {
      follow();
    }
    setIsFollowedState(!isFollowedState);
  };

  const navi = useNavigate();
  const infoHandler = () => {
    setIsModalOpened(false);
    navi(`/profile/${userName}`);
  };

  return (
    <UserItemWrapper>
      <InfoWrapper onClick={infoHandler}>
        <ProfileImg src={profileImage} />
        <Paragraph sizeType="base">{userName}</Paragraph>
        {companyName && <CompanyImg src={getImageUrl(COMPANY[companyName], 'logo', 'png')} />}
      </InfoWrapper>

      <Button
        designType={isFollowedState ? 'blueFill' : 'blueEmpty'}
        padding="0.15rem 0.75rem"
        fontSize="14px"
        borderRadius="var(--borders-radius-base)"
        onClick={followBtnHandler}
      >
        {isFollowedState ? '팔로잉' : '팔로우'}
      </Button>
    </UserItemWrapper>
  );
};

export default SimpleUserItem;
