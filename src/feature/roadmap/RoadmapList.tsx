import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getRoadmapList } from '../../apis/roadmap/roadmap';
import RoadmapListItem from './RoadmapListItem';

export interface IRoadmapListItem {
  roadmapId: number;
  author: {
    userId: number;
    userName: string;
    profileImage?: string;
    companyName?: string;
    isFollowed: boolean;
  };
  title: string;
  tag: string;
  isBookmarked: boolean;
  isLiked: boolean;
  likeCount: number;
  createdAt: number;
  updatedAt: number;
}

const RoadmapItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 952px;
`;

const RoadmapList = () => {
  const { data: roadmapList } = useQuery<Array<IRoadmapListItem>>(['roadmapList'] as const, () =>
    getRoadmapList()
  );

  return (
    <RoadmapItemWrapper>
      {roadmapList?.map((roadmap) => (
        <Link to={`/roadmap/${roadmap.author.userName}`} key={roadmap.author.userId}>
          <RoadmapListItem roadmap={roadmap} />
        </Link>
      ))}
    </RoadmapItemWrapper>
  );
};

export default RoadmapList;
