import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ModalWrapper, NavWrapper, NavItem, ItemWrapper } from './SubscriptionPage';
import { getUserId, getUserFollow } from '../../apis/profile/profile';
import { ISimpleUserData } from '../../interface/user';
import SimpleUserItem from '../../feature/user/profile/SimpleUserItem';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import ProfileEmptyUpper from '../../feature/user/profile/ProfileEmptyUpper';

const FollowersPage = () => {
  const { userName } = useParams();
  const navi = useNavigate();

  const { data: userId, isLoading: userIdLoading } = useQuery<number>(
    ['myFollowerList', 'userId', userName] as const,
    () => getUserId(userName!)
  );

  const queryClient = useQueryClient();
  const { data: followers, isLoading: contentLoading } = useQuery<Array<ISimpleUserData>>(
    ['follower', userName],
    () => getUserFollow(userId!, { type: 'follower' }),
    {
      enabled: !!userId,
      onSuccess: () => {
        queryClient.invalidateQueries(['myFollowerList', 'userId', userName]);
        queryClient.invalidateQueries(['userDetail', userName]);
      },
    }
  );

  if (userIdLoading || contentLoading) {
    return <LoadingSpinner />;
  }

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
        {(!followers || followers?.length === 0) && <ProfileEmptyUpper category={2} />}
      </ItemWrapper>
    </ModalWrapper>
  );
};

export default FollowersPage;
