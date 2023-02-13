import styled from 'styled-components';
import { Handle, Position } from 'reactflow';

const Content = styled.div`
  color: ${({ theme }) => theme.textColor};
  text-align: center;
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

export default ContentNode;
