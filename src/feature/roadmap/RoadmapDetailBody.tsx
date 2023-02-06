import styled from 'styled-components';
import { ReactFlow, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { INode, IEdge } from '../../interface/roadmap';

interface IRoadmapDetailProps {
  nodes: Array<INode>;
  edges: Array<IEdge>;
}

const DetailWrapper = styled.div`
  width: 100%;
  height: 800px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: var(--borders-radius-base);
`;

const RoadmapDetailBody = ({ nodes, edges }: IRoadmapDetailProps) => {
  return (
    <DetailWrapper>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Controls />
      </ReactFlow>
    </DetailWrapper>
  );
};

export default RoadmapDetailBody;
