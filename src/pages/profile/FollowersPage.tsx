import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ModalWrapper, NavWrapper, NavItem, ItemWrapper } from './SubscriptionPage';
import { getUserId, getUserFollow } from '../../apis/profile/profile';
import { ISimpleUserData } from '../../interface/user';
import SimpleUserItem from '../../feature/user/profile/SimpleUserItem';

const FollowersPage = () => {
  const { userName } = useParams();
  const navi = useNavigate();

  const { data: userId, isLoading: userIdLoading } = useQuery<number>(
    ['myAnswerList', 'userId'] as const,
    () => getUserId(userName!)
  );
  const { data: followers, isLoading: contentLoading } = useQuery<any>(
    ['user', 'follower'],
    () => getUserFollow(userId!, { type: 'follower' }),
    { enabled: !!userId }
  );

  if (userIdLoading || contentLoading) {
    return <p>Loading...</p>;
  }
  console.logI(followers);
  return (
    <ModalWrapper>
      <NavWrapper>
        <NavItem onClick={() => navi(`/profile/${userName}/subscription`, { replace: true })}>
          구독
        </NavItem>
        <NavItem onClick={() => navi(`/profile/${userName}/following`, { replace: true })}>
          팔로잉
        </NavItem>
        <NavItem toggle>팔로워</NavItem>
      </NavWrapper>

      <ItemWrapper>
        {followers?.map((user: ISimpleUserData) => {
          return <SimpleUserItem {...user} key={user.userId} />;
        })}
      </ItemWrapper>
    </ModalWrapper>
  );
};

export default FollowersPage;
