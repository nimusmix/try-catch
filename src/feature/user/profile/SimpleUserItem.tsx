import styled from 'styled-components';
import { ISimpleUserData } from '../../../interface/user';
import { Button, Paragraph } from '../../../components';
import getImageUrl from '../../../utils/getImageUrl';
import { COMPANY } from '../../../constant/company';

const UserItemWrapper = styled.div`
  display: flex;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const CompanyImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: var(--borders-radius-base);
`;

const SimpleUserItem = ({
  userId,
  userName,
  profileImage,
  companyName,
  isFollowed,
}: ISimpleUserData) => {
  return (
    <UserItemWrapper>
      <ProfileImg src={profileImage} />
      <Paragraph sizeType="base">{userName}</Paragraph>
      {companyName && <CompanyImg src={getImageUrl(COMPANY[companyName], 'logo', 'png')} />}
      <Button designType={isFollowed ? 'blueFill' : 'blueEmpty'}>
        {isFollowed ? '팔로잉' : '팔로우'}
      </Button>
    </UserItemWrapper>
  );
};

export default SimpleUserItem;
