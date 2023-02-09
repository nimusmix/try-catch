import styled from 'styled-components';
import { ReactFlow, Controls, Handle, Position } from 'reactflow';
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

const Content = styled.div`
  width: 160px;
  height: 42px;
  padding: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.bgColor};
  text-align: center;
  border: 1px var(--colors-brand-500) solid;
  border-radius: var(--borders-radius-base);
`;

const ContentNode = ({ data }: { data: any }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} id="t" />
      <Handle type="target" position={Position.Left} id="l" />
      <Content>{data.label}</Content>
      <Handle type="source" position={Position.Bottom} id="b" />
      <Handle type="source" position={Position.Right} id="r" />
    </>
  );
};

const RoadmapDetailBody = ({ nodes, edges }: IRoadmapDetailProps) => {
  nodes.map((node: INode) => Object.assign(node, { type: 'content' }));

  return (
    <DetailWrapper>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Controls />
      </ReactFlow>
    </DetailWrapper>
  );
};

export default RoadmapDetailBody;
