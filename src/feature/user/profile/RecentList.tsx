import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { IFeedItem } from '../../../interface/feed';
import { getUserId, getUserRecent } from '../../../apis/profile/profile';
import RecentListItem from './RecentListItem';
import ProfileEmptyUnder from './ProfileEmptyUnder';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';

const RecentWrapper = styled.section`
  width: 800px;
`;

const RecentList = () => {
  const { userName } = useParams();
  const { data: userId, isLoading: userIdLoading } = useQuery<number>(
    ['recentList', 'userId'] as const,
    () => getUserId(userName!)
  );

  const { data: recentList, isLoading: recentLoading } = useQuery<Array<IFeedItem>>(
    ['recentList', userName],
    () => getUserRecent(userId!),
    {
      enabled: !!userId,
    }
  );

  if (userIdLoading || recentLoading) {
    return <LoadingSpinner />;
  }

  if (recentList?.length === 0) {
    return <ProfileEmptyUnder category={2} />;
  }

  return (
    <RecentWrapper>
      {recentList!.map((rec: IFeedItem) => {
        return <RecentListItem {...rec} key={rec.url} />;
      })}
    </RecentWrapper>
  );
};

export default RecentList;
