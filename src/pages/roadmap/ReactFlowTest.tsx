import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  // applyEdgeChanges,
  // applyNodeChanges,
  // addEdge,
  // EdgeChange,
  // Connection,
  Handle,
  Position,
  // NodeChange,
  ReactFlowProvider,
  useReactFlow,
  useNodes,
  useEdges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '../../components';

// 1. 스타일을 가져와야 동작함.
// 2. 부모 컨테이너는 너비와 높이가 필요함.
// 3. 한 페이지에 여러 흐름이 있는 경우 idReact 흐름이 제대로 작동하도록 각 구성 요소에 고유한 prop을 전달해야 함.

const initialNodes = [
  {
    id: 'a',
    position: { x: 0, y: 0 },
    data: { value: 'Hello' },
    type: 'textUpdater',
  },
  {
    id: 'b',
    position: { x: 100, y: 100 },
    data: { label: 'World' },
  },
];

const initialEdges = [{ id: 'a-b', source: 'a', target: 'b', type: 'step' }];

// 사용자 정의
const handleStyle = { left: 10 };

const TextUpdaterNode = ({ data }: any) => {
  const onChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      console.log(evt.target.value);
      // eslint-disable-next-line no-param-reassign
      data.label = evt.target.value;
    },
    [data]
  );

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <input id="text" name="text" onChange={onChange} style={{ border: '1px solid red' }} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </>
  );
};

let nodeId = 0;

const ReactFlowTest = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const testNodes = useNodes();
  const testEdges = useEdges();

  const reactFlowInstance = useReactFlow();
  const onClick = useCallback(() => {
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

  const printData = () => {
    console.log(testNodes);
    console.log(testEdges);
  };

  // const onNodesChange = useCallback(
  //   (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //   []
  // );
  // const onEdgesChange = useCallback(
  //   (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   []
  // );

  // const onConnect = useCallback(
  //   (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
  //   []
  // );

  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  return (
    <div style={{ width: '600px', height: '600px', border: '2px red solid' }}>
      <Button onClick={onClick}>Add node</Button>
      <Button onClick={printData}>Save</Button>
      <ReactFlow
        defaultNodes={initialNodes}
        // onNodesChange={onNodesChange}
        defaultEdges={initialEdges}
        // onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

const Flow = () => {
  return (
    <ReactFlowProvider>
      <ReactFlowTest />
    </ReactFlowProvider>
  );
};

export default Flow;
