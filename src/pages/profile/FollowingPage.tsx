import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ModalWrapper, NavWrapper, NavItem, ItemWrapper } from './SubscriptionPage';
import { getUserId, getUserFollow } from '../../apis/profile/profile';
import { ISimpleUserData } from '../../interface/user';
import SimpleUserItem from '../../feature/user/profile/SimpleUserItem';

const FollowingPage = () => {
  const { userName } = useParams();
  const navi = useNavigate();

  const { data: userId, isLoading: userIdLoading } = useQuery<number>(
    ['myAnswerList', 'userId'] as const,
    () => getUserId(userName!)
  );
  const { data: following, isLoading: contentLoading } = useQuery<any>(
    ['user', 'following'],
    () => getUserFollow(userId!, { type: 'followee' }),
    { enabled: !!userId }
  );

  if (userIdLoading || contentLoading) {
    return <p>Loading...</p>;
  }
  console.log('유저아이디', userId);
  console.log('팔로잉', following);
  return (
    <ModalWrapper>
      <NavWrapper>
        <NavItem onClick={() => navi(`/profile/${userName}/subscription`, { replace: true })}>
          구독
        </NavItem>
        <NavItem toggle>팔로잉</NavItem>
        <NavItem onClick={() => navi(`/profile/${userName}/followers`, { replace: true })}>
          팔로워
        </NavItem>
      </NavWrapper>
      <ItemWrapper>
        {following?.map((user: ISimpleUserData) => {
          return <SimpleUserItem {...user} key={user.userId} />;
        })}
      </ItemWrapper>
    </ModalWrapper>
  );
};

export default FollowingPage;
