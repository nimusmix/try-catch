import styled from 'styled-components';
import { Div, Paragraph, MiniTitle, Button } from '../../components';

interface IRoadmapItemProps {
  author: {
    userId: number;
    userName: string;
    profileImage?: string;
    companyName?: string;
    isFollowed: boolean;
  };
  title: string;
  tag: string;
}

const ItemWrapper = styled(Div)`
  display: flex;
  align-items: center;
  width: 500px;
  padding: 1.5rem 2rem;
  margin: 1rem;
`;

const Img = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  margin-right: 1.5rem;
`;

const Line = styled.div`
  width: 100%;
  border-bottom: 1px ${({ theme }) => theme.borderColor} solid;
  margin: 0.5rem 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;

  h3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0.1rem 0 0.7rem;
  }
`;

const RoadmapListItem = ({ roadmap }: { roadmap: IRoadmapItemProps }) => {
  return (
    <ItemWrapper>
      {roadmap.author.profileImage ? (
        <Img src={roadmap.author.profileImage} alt={roadmap.author.userName} />
      ) : (
        <Img src={new URL(`/src/assets/favicon.ico`, import.meta.url).href} alt="d" />
      )}

      <InfoWrapper>
        <Paragraph sizeType="lg" fontWeight="500">
          {roadmap.author.userName}
        </Paragraph>
        <Paragraph sizeType="sm">{roadmap.author.companyName || '미인증'}</Paragraph>
        <Line />
        <MiniTitle sizeType="xl" fontWeight="600">
          {roadmap.title}
        </MiniTitle>
        <Button designType="purpleFill" fontSize="var(--fonts-body-xm)" padding="2.2px 10px">
          {roadmap.tag}
        </Button>
      </InfoWrapper>
    </ItemWrapper>
  );
};

export default RoadmapListItem;
