import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getUserBadge, getUserId } from '../../../apis/profile/profile';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import { IBadge } from '../../../interface/user';
import BadgeListItem from './BadgeListItem';

const BadgeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem 4rem;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: var(--borders-radius-lg);
`;

const EmptyBadge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--colors-white-300);
`;

const BadgeList = () => {
  const { userName } = useParams();
  const { data: userId, isLoading: userIdLoading } = useQuery<number>(
    ['badgeList', 'userId', userName] as const,
    () => getUserId(userName!)
  );

  const { data: badgeList, isLoading: badgeLoading } = useQuery<Array<IBadge>>(
    ['badgeList', userName],
    () => getUserBadge(userId!),
    { enabled: !!userId }
  );

  if (userIdLoading || badgeLoading) {
    return <LoadingSpinner />;
  }

  const EmptyList = [];
  if (badgeList!.length < 5) {
    const EmptyCnt = 5 - badgeList!.length;
    for (let i = 1; i <= EmptyCnt; i += 1) {
      EmptyList.push(<EmptyBadge key={i} />);
    }
  }

  return (
    <BadgeWrapper>
      {badgeList!.slice(0, 4)!.map((item) => (
        <BadgeListItem {...item} key={item.badgeId} />
      ))}
      {EmptyList}
    </BadgeWrapper>
  );
};

export default BadgeList;
