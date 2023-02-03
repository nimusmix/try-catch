import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { getRoadmapList } from '../../apis/roadmap/roadmap';
import RoadmapListItem from './RoadmapListItem';

interface IRoadmapListItem {
  author: {
    userId: number;
    userName: string;
    profileImage: string;
    companyName: string;
    isFollowed: boolean;
  };
  title: string;
  tag: string;
}

const RoadmapList = () => {
  const { data: roadmapList } = useQuery<Array<IRoadmapListItem>>(['roadmapList'], () =>
    getRoadmapList()
  );

  return (
    <div>
      {roadmapList?.map((roadmap) => (
        <Link to={`/roadmap/${roadmap.author.userName}`} key={roadmap.author.userId}>
          <RoadmapListItem roadmap={roadmap} />
        </Link>
      ))}
    </div>
  );
};

export default RoadmapList;
