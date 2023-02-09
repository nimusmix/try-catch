import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ModalWrapper, NavWrapper, NavItem, ItemWrapper } from './SubscriptionPage';

const FollowersPage = () => {
  const { userName } = useParams();

  const navi = useNavigate();

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
        <p>{userName}</p>
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
