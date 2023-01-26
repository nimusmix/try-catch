import React, { useCallback } from 'react';

import ReactFlow, { addEdge, useNodesState, useEdgesState, MarkerType, Edge } from 'reactflow';

import CustomNode from './CustomNode';
import FloatingEdge from './FloatingEdge';
import CustomConnectionLine from './CustomConnectionLine';

import 'reactflow/dist/style.css';
import './style.css';

interface IInitialNode {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
}

const initialNodes: Array<any> = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'custom',
    position: { x: 250, y: 320 },
  },
  {
    id: '3',
    type: 'custom',
    position: { x: 40, y: 300 },
  },
  {
    id: '4',
    type: 'custom',
    position: { x: 300, y: 0 },
  },
];

const initialEdges: Edge<any>[] = [];

const connectionLineStyle = {
  strokeWidth: 3,
  stroke: 'black',
};

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  floating: FloatingEdge,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: 'black' },
  type: 'floating',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: 'black',
  },
};

const EasyConnectExample = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '800px', height: '800px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        // 노드와 엣지의 타입 정의
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        // 드래그 후 엣지의 스타일 옵션
        defaultEdgeOptions={defaultEdgeOptions}
        // 드래그 할 때 마우스 포인트(끝 점) 표시하는 역할
        connectionLineComponent={CustomConnectionLine}
        // 드래그할 때 엣지 보여주는 역할
        connectionLineStyle={connectionLineStyle}
      />
    </div>
  );
};

export default EasyConnectExample;
