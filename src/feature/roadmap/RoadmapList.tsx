import RoadmapListItem from './RoadmapListItem';

const MRoadmapList = [
  {
    author: {
      userId: 1,
      userName: '42good',
      profileImage: '',
      companyName: 'kakao',
      isFollowed: false,
    },
    title: '내가 카카오 개발자가 되기까지',
    tag: '백엔드',
  },
  {
    author: {
      userId: 2,
      userName: 'nimusmix',
      profileImage: 'https://avatars.githubusercontent.com/u/109320569?v=4',
      companyName: 'kakao',
      isFollowed: true,
    },
    title: '두 번째 로드맵',
    tag: '프론트엔드',
  },
];

const RoadmapList = () => {
  return (
    <div>
      {MRoadmapList.map((roadmap) => (
        <RoadmapListItem key={roadmap.author.userId} roadmap={roadmap} />
      ))}
    </div>
  );
};

export default RoadmapList;
