import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ModalWrapper, NavWrapper, NavItem, ItemWrapper } from './SubscriptionPage';
import { getUserId, getUserFollow } from '../../apis/profile/profile';
import { ISimpleUserData } from '../../interface/user';

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
  console.log(following);
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
        <p>팔로잉</p>
        <p>팔로잉</p>
        <p>팔로잉</p>
        <p>팔로잉</p>
        <p>팔로잉</p>
        <p>팔로잉</p>
        <p>팔로잉</p>
        <p>팔로잉</p>
        <p>팔로잉</p>
        <p>팔로잉</p>
      </ItemWrapper>
    </ModalWrapper>
  );
};

export default FollowingPage;
