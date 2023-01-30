import { Link, useParams } from 'react-router-dom';
import { ModalWrapper, NavWrapper, NavItem, ItemWrapper } from './SubscriptionPage';

const FollowingPage = () => {
  const { username } = useParams();
  return (
    <ModalWrapper>
      <NavWrapper>
        <Link to={`/profile/${username}/subscription`}>
          <NavItem>구독</NavItem>
        </Link>
        <Link to={`/profile/${username}/following`}>
          <NavItem toggle>팔로잉</NavItem>
        </Link>
        <Link to={`/profile/${username}/followers`}>
          <NavItem>팔로워</NavItem>
        </Link>
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
