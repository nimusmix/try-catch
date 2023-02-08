import { useParams, useNavigate } from 'react-router-dom';
import { ModalWrapper, NavWrapper, NavItem, ItemWrapper } from './SubscriptionPage';

const FollowingPage = () => {
  const { userName } = useParams();
  const navi = useNavigate();
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
