import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Handle,
  Position,
  Background,
  ReactFlowProvider,
  useReactFlow,
  useNodes,
  useEdges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import { Button } from '../../components';

interface IEdges {
  id: string;
  source: string;
  target: string;
  type: string;
}

const StyledInput = styled.input`
  width: 160px;
  padding: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.bgColor};
  /* background-color: var(--colors-brand-200); */
  text-align: center;
  border: 1px var(--colors-brand-500) solid;
  /* border: none; */
  border-radius: var(--borders-radius-base);

  & :focus {
    outline: none;
    border: none;
  }
  & :active {
    outline: none;
    border: none;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const ButtonWrapeer = styled.div`
  display: flex;
  margin-bottom: 0.725rem;
  & :first-child {
    margin-right: 0.725rem;
  }
`;

const FlowWrapper = styled.div`
  width: 800px;
  height: 600px;
  border: 1px ${({ theme }) => theme.borderColor} solid;
  border-radius: var(--borders-radius-base);
`;

const initialNodes = [
  {
    id: '1',
    position: { x: 320, y: 50 },
    data: { value: '1' },
    type: 'textUpdater',
  },
  {
    id: '2',
    position: { x: 320, y: 120 },
    data: { value: '2' },
    type: 'textUpdater',
  },
];

const initialEdges: Array<IEdges> = [];

// 사용자 정의
const TextUpdaterNode = ({ data }: any) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line no-param-reassign
      data.label = e.target.value;
    },
    [data]
  );

  return (
    <>
      <Handle type="target" position={Position.Top} id="t" />
      <Handle type="target" position={Position.Left} id="l" />
      <div>
        <StyledInput id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
      <Handle type="source" position={Position.Right} id="r" />
    </>
  );
};

let nodeId = 3;

const ReactFlowForm = () => {
  const newNodes = useNodes();
  const newEdges = useEdges();

  const reactFlowInstance = useReactFlow();

  const addNode = useCallback(() => {
    nodeId += 1;
    const id = `${nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
      type: 'textUpdater',
    };
    reactFlowInstance.addNodes(newNode);
  }, [reactFlowInstance]);

  const saveData = () => {
    console.log(newNodes);
    console.log(newEdges);
  };

  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  return (
    <FormWrapper>
      <ButtonWrapeer>
        <Button onClick={addNode}>노드 추가</Button>
        <Button onClick={saveData}>저장</Button>
      </ButtonWrapeer>
      <FlowWrapper>
        <ReactFlow defaultNodes={initialNodes} defaultEdges={initialEdges} nodeTypes={nodeTypes}>
          <Background />
        </ReactFlow>
      </FlowWrapper>
    </FormWrapper>
  );
};

const RoadmapForm = () => {
  return (
    <ReactFlowProvider>
      <ReactFlowForm />
    </ReactFlowProvider>
  );
};

export default RoadmapForm;
