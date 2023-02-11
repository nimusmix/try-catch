import styled from 'styled-components';
import { Handle, Position } from 'reactflow';

const Content = styled.div`
  color: ${({ theme }) => theme.textColor};
  text-align: center;
`;

const CommonNode = ({ data }: { data: any }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} id="t" />
      <Content>{data.label}</Content>
      <Handle type="source" position={Position.Bottom} id="b" />
    </>
  );
};

export default CommonNode;
