import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import ReactFlow, { Background, Controls, Edge, useEdges, useNodes, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import { Button, Input, MiniTitle } from '../../components';
import { postRoadmap, putRoadmap, getRoadmapDetail } from '../../apis/roadmap/roadmap';
import { logOnDev } from '../../utils/logging';
import { INode, IEdge, IRoadmap } from '../../interface/roadmap';
import TextUpdaterNode from './node-style/TextUpdaterNode';
import { getName } from '../../apis/auth/auth';
import LoadingSpinner from '../../components/loading/LoadingSpinner';

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
  button {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'rgba(46, 52, 64, 1)' : 'var(--colors-white-500)'};
    border-bottom: 1px solid
      ${({ theme: { isDark } }) => (isDark ? 'var(--colors-black-100)' : '#eeeeee')};
    :hover {
      background-color: ${({ theme: { isDark } }) => (isDark ? 'var(--colors-black-200)' : null)};
    }
    svg {
      fill: ${({ theme: { textColor } }) => textColor};
    }
  }
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
let nodeId = 9999;

const RoadmapForm = () => {
  const { pathname } = useLocation();
  const isEditPage = pathname === '/roadmap/edit';

  const { data: myName } = useQuery<string>(['myName'], () => getName());
  const { data: oldRoadmap, isLoading } = useQuery<IRoadmap>(
    ['oldRoadmap', myName] as const,
    () => getRoadmapDetail(myName!),
    { enabled: !!isEditPage && !!myName }
  );

  const { register, handleSubmit } = useForm();

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
          label: '',
        },
        type: 'textUpdater',
      };
      reactFlowInstance.addNodes(newNode);
    },
    [reactFlowInstance]
  );

  const navi = useNavigate();
  const saveRoadmap = useMutation(postRoadmap, {
    onSuccess: () => {
      console.log('이름', myName);
      navi(`/roadmap/${myName}`);
    },
    onError: (error) => logOnDev.log(error),
  });

  const editRoadmap = useMutation(putRoadmap, {
    onSuccess: () => navi(`/roadmap/${myName}`),
    onError: (error) => logOnDev.log(error),
  });

  const saveData = (data: any) => {
    const roadmap = {
      title: data.title,
      tag: data.tag,
      nodes: JSON.stringify(newNodes),
      edges: JSON.stringify(newEdges),
    };

    if (isEditPage) {
      editRoadmap.mutate(roadmap);
    } else {
      saveRoadmap.mutate(roadmap);
    }
  };

  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit(saveData)}>
      <InputWrapper>
        <MiniTitle sizeType="2xl" fontWeight="600">
          제목
        </MiniTitle>
        <InfoInput
          {...register('title', { required: '제목은 필수 항목입니다.' })}
          defaultValue={isEditPage ? oldRoadmap?.title : ''}
        />
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
        <ReactFlow
          defaultNodes={isEditPage ? oldRoadmap?.nodes : initialNodes}
          defaultEdges={isEditPage ? oldRoadmap?.edges : initialEdges}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </FlowWrapper>

      <InputWrapper>
        <MiniTitle sizeType="2xl" fontWeight="600">
          태그
        </MiniTitle>
        <InfoInput
          width="100px"
          {...register('tag', { required: '태그는 필수 항목입니다.' })}
          defaultValue={isEditPage ? oldRoadmap?.tag : ''}
        />
      </InputWrapper>

      <Button borderRadius="var(--borders-radius-lg)">저장</Button>
    </form>
  );
};

export default RoadmapForm;
