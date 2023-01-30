import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  height: 380px;
  overflow-y: auto;
`;

export const NavWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: fixed;
  width: 100%;
`;

export const NavItem = styled.div<{ toggle?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-black-300)' : 'var(--colors-white-500)'};
  text-align: center;
  font-weight: ${({ toggle }) => (toggle ? 600 : 400)};
  color: ${({ toggle, theme }) => (toggle ? 'var(--colors-brand-500)' : `${theme.textColor}`)};
  border-bottom: ${({ toggle, theme }) =>
      toggle ? '2px var(--colors-brand-500)' : `1px ${theme.borderColor}`}
    solid;
  z-index: 999;
  &.isActive {
    border-bottom: 1px var(--colors-brand-500) solid;
  }
`;

export const ItemWrapper = styled.div`
  margin-top: 3rem;
`;

const SubscriptionPage = () => {
  const { username } = useParams();
  return (
    <ModalWrapper>
      <NavWrapper>
        <Link to={`/profile/${username}/subscription`}>
          <NavItem toggle>구독</NavItem>
        </Link>
        <Link to={`/profile/${username}/following`}>
          <NavItem>팔로잉</NavItem>
        </Link>
        <Link to={`/profile/${username}/followers`}>
          <NavItem>팔로워</NavItem>
        </Link>
      </NavWrapper>
      <ItemWrapper>
        <p>사람</p>
        <p>사람</p>
        <p>사람</p>
        <p>사람</p>
        <p>사람</p>
        <p>사람</p>
        <p>사람</p>
        <p>사람</p>
        <p>사람</p>
      </ItemWrapper>
    </ModalWrapper>
  );
};

export default SubscriptionPage;
