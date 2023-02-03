import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Paragraph, SubTitle, MiniTitle, Button } from '../../components';
import { IRoadmap } from '../../interface/roadmap';
import { getRoadmapDetail } from '../../apis/roadmap/roadmap';
import { Layout } from '../../layout';
import RoadmapDetailBody from '../../feature/roadmap/RoadmapDetailBody';

const RoadmapDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 800px;
  margin: 3rem auto;

  h2 {
    margin: 0.725rem 0 1.5rem;
  }
`;

const Img = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 2hrem;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;

const RoadmapDetailPage = () => {
  const { userName } = useParams();
  const { data: roadmapDetail, isLoading } = useQuery<IRoadmap>(['roadmap', userName], () =>
    getRoadmapDetail(userName!)
  );

  if (isLoading) {
    return <Paragraph sizeType="base">Loading...</Paragraph>;
  }

  return (
    <Layout>
      <RoadmapDetailWrapper>
        {/* 태그 */}
        <Button
          as="span"
          designType="purpleFill"
          fontSize="var(--fonts-body-sm)"
          padding="2.2px 10px"
        >
          {roadmapDetail?.tag}
        </Button>

        <SubTitle>{roadmapDetail?.title}</SubTitle>

        <UserWrapper>
          <UserInfoWrapper>
            <Img src={roadmapDetail?.author.profileImage} />
            <div>
              <MiniTitle sizeType="xl">{roadmapDetail?.author.userName}</MiniTitle>
              <Paragraph sizeType="base">{roadmapDetail?.author.companyName}</Paragraph>
            </div>
          </UserInfoWrapper>

          {/* 팔로우 버튼 */}
          {roadmapDetail?.author.isFollowed ? (
            <Button designType="blueFill" borderRadius="var(--borders-radius-lg)">
              팔로잉
            </Button>
          ) : (
            <Button borderRadius="var(--borders-radius-lg)">팔로우</Button>
          )}
        </UserWrapper>
        <RoadmapDetailBody nodes={roadmapDetail!.nodes} edges={roadmapDetail!.edges} />
      </RoadmapDetailWrapper>
    </Layout>
  );
};

export default RoadmapDetailPage;
