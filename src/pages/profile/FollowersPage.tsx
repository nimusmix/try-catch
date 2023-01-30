import { Link } from 'react-router-dom';
import { ModalWrapper, NavWrapper, NavItem, ItemWrapper } from './SubscriptionPage';

const FollowersPage = () => {
  return (
    <ModalWrapper>
      <NavWrapper>
        <Link to="/profile/:username/subscription">
          <NavItem>구독</NavItem>
        </Link>
        <Link to="/profile/:username/following">
          <NavItem>팔로잉</NavItem>
        </Link>
        <Link to="/profile/:username/followers">
          <NavItem toggle>팔로워</NavItem>
        </Link>
      </NavWrapper>
      <ItemWrapper>
        <p>팔로워</p>
        <p>팔로워</p>
        <p>팔로워</p>
        <p>팔로워</p>
        <p>팔로워</p>
        <p>팔로워</p>
        <p>팔로워</p>
        <p>팔로워</p>
        <p>팔로워</p>
        <p>팔로워</p>
      </ItemWrapper>
    </ModalWrapper>
  );
};

export default FollowersPage;
