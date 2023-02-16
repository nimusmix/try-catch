import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { ModalWrapper, NavWrapper, NavItem, ItemWrapper } from './SubscriptionPage';
import { getUserId, getUserFollow } from '../../apis/profile/profile';
import { ISimpleUserData } from '../../interface/user';
import SimpleUserItem from '../../feature/user/profile/SimpleUserItem';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import ProfileEmptyUpper from '../../feature/user/profile/ProfileEmptyUpper';

const FollowingPage = () => {
  const { userName } = useParams();
  const navi = useNavigate();

  const { data: userId, isLoading: userIdLoading } = useQuery<number>(
    ['myFollowingList', 'userId', userName] as const,
    () => getUserId(userName!)
  );

  const queryClient = useQueryClient();
  const { data: following, isLoading: contentLoading } = useQuery<any>(
    ['following', userName],
    () => getUserFollow(userId!, { type: 'followee' }),
    {
      enabled: !!userId,
      onSuccess: () => {
        queryClient.invalidateQueries(['myFollowingList', 'userId', userName]);
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
        <NavItem toggle>팔로잉</NavItem>
        <NavItem onClick={() => navi(`/profile/${userName}/followers`, { replace: true })}>
          팔로워
        </NavItem>
      </NavWrapper>
      <ItemWrapper>
        {following?.map((user: ISimpleUserData) => {
          return <SimpleUserItem {...user} key={user.userId} />;
        })}
        {(!following || following?.length === 0) && <ProfileEmptyUpper category={1} />}
      </ItemWrapper>
    </ModalWrapper>
  );
};

export default FollowingPage;
