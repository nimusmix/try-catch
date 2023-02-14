import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserId, getUserSubscription } from '../../apis/profile/profile';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { ISubscription } from '../../interface/user';

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  height: 380px;
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
  padding: 0.5rem 2.25rem;
  overflow-y: auto;
`;

const SubscriptionPage = () => {
  const { userName } = useParams();

  const { data: userId, isLoading: userIdLoading } = useQuery<number>(
    ['myAnswerList', 'userId'] as const,
    () => getUserId(userName!)
  );
  const { data: subscription, isLoading: contentLoading } = useQuery<Array<ISubscription>>(
    ['subscription', userName],
    () => getUserSubscription(userId!),
    { enabled: !!userId }
  );

  const navi = useNavigate();

  if (userIdLoading || contentLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ModalWrapper>
      <NavWrapper>
        <NavItem toggle>구독</NavItem>
        <NavItem onClick={() => navi(`/profile/${userName}/following`, { replace: true })}>
          팔로잉
        </NavItem>
        <NavItem onClick={() => navi(`/profile/${userName}/followers`, { replace: true })}>
          팔로워
        </NavItem>
      </NavWrapper>
      <ItemWrapper>
        <p>구독 구현 후 테스트해보기</p>
      </ItemWrapper>
    </ModalWrapper>
  );
};

export default SubscriptionPage;
