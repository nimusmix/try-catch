import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  Background,
  Edge,
  Handle,
  Position,
  ReactFlowProvider,
  useEdges,
  useNodes,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import { Button, Input, MiniTitle } from '../../components';
import { postRoadmap } from '../../apis/roadmap/roadmap';

export interface INode {
  width: string;
  height: string;
  id: string;
  position: { x: number; y: number };
  data: {
    value: string;
    label: string;
  };
  type: string;
  positionAbsolute: string;
  selected: boolean;
  dragging: boolean;
}

export interface IEdges {
  id: string;
  source: string;
  target: string;
  type: string;
  markerEnd?: string;
  style?: string;
}

const StyledInput = styled.input`
  width: 160px;
  padding: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.bgColor};
  text-align: center;
  border: 1px var(--colors-brand-500) solid;
  border-radius: var(--borders-radius-base);
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;
  margin-bottom: 2.75rem;
  h3 {
    margin-bottom: 0.5rem;
  }
`;

const InfoInput = styled(Input)`
  border: none;
  border-bottom: 1px ${({ theme }) => theme.borderColor} solid;
  border-radius: 0;
  padding: 0.25rem;
`;

const RoadmapTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.75rem;
`;

const FlowWrapper = styled.div`
  width: 800px;
  height: 600px;
  border: 1px ${({ theme }) => theme.borderColor} solid;
  border-radius: var(--borders-radius-base);
  margin-bottom: 2.25rem;
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

const initialEdges: Edge<any>[] = [];

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

const RoadmapForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const newNodes = useNodes();
  const newEdges = useEdges();

  const reactFlowInstance = useReactFlow();

  const addNode = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

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
    },
    [reactFlowInstance]
  );

  const navi = useNavigate();
  const saveRoadmap = useMutation(postRoadmap, {
    onSuccess: (data) => navi(`/roadmap/${data.data.author.userName}`),
    onError: (error) => console.log(error),
  });

  const saveData = (data: any) => {
    const rstNodes = newNodes.map((node) => Object.assign(node, { type: 'output' }));
    const roadmap = {
      title: data.title,
      tag: data.tag,
      nodes: JSON.stringify(rstNodes),
      edges: JSON.stringify(newEdges),
    };
    saveRoadmap.mutate(roadmap);
  };

  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  return (
    <form onSubmit={handleSubmit(saveData)}>
      <InputWrapper>
        <MiniTitle sizeType="2xl" fontWeight="600">
          제목
        </MiniTitle>
        <InfoInput {...register('title', { required: '제목은 필수 항목입니다.' })} />
      </InputWrapper>

      <RoadmapTitleWrapper>
        <MiniTitle sizeType="2xl" fontWeight="600">
          로드맵
        </MiniTitle>
        <Button onClick={addNode} borderRadius="var(--borders-radius-lg)">
          노드 추가
        </Button>
      </RoadmapTitleWrapper>

      <FlowWrapper>
        <ReactFlow defaultNodes={initialNodes} defaultEdges={initialEdges} nodeTypes={nodeTypes}>
          <Background />
        </ReactFlow>
      </FlowWrapper>

      <InputWrapper>
        <MiniTitle sizeType="2xl" fontWeight="600">
          태그
        </MiniTitle>
        <InfoInput width="100px" {...register('tag', { required: '태그는 필수 항목입니다.' })} />
      </InputWrapper>

      <Button borderRadius="var(--borders-radius-lg)">저장</Button>
    </form>
  );
};

export default RoadmapForm;
