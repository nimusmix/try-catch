import styled from 'styled-components';
import { useMemo } from 'react';
import { ReactFlow, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { INode, IEdge } from '../../interface/roadmap';
import ContentNode from './node-style/ContentNode';

interface IRoadmapDetailProps {
  nodes: Array<INode>;
  edges: Array<IEdge>;
}

const DetailWrapper = styled.div`
  width: 100%;
  height: 800px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: var(--borders-radius-base);

  .react-flow__node-default {
    border: 1px solid var(--colors-brand-500);
    border-radius: var(--borders-radius-base);
    background-color: ${({ theme }) => theme.bgColor};
  }
`;

const RoadmapDetailBody = ({ nodes, edges }: IRoadmapDetailProps) => {
  nodes.map((node: INode) => Object.assign(node, { type: 'content' }));
  const nodeTypes = useMemo(() => ({ default: ContentNode }), []);

  return (
    <DetailWrapper>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Controls />
      </ReactFlow>
    </DetailWrapper>
  );
};

export default RoadmapDetailBody;
