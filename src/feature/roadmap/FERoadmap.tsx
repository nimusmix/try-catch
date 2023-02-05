import { useMemo } from 'react';
import ReactFlow, { Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';

const nodes = [
  {
    width: 160,
    height: 42,
    id: '1-1',
    position: { x: 520, y: 50 },
    data: { label: 'HTML' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '1-2',
    position: { x: 520, y: 100 },
    data: { label: 'CSS' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '1-3',
    position: { x: 520, y: 150 },
    data: { label: 'JavaScript' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '2',
    position: { x: 300, y: 100 },
    data: { label: 'BEM' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '3-1',
    position: { x: 740, y: 100 },
    data: { label: 'Sass' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '3-2',
    position: { x: 740, y: 150 },
    data: { label: 'PostCSS' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '3-3',
    position: { x: 740, y: 200 },
    data: { label: 'cssnext' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '4-1',
    position: { x: 300, y: 200 },
    data: { label: 'Webpack' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '4-2',
    position: { x: 300, y: 250 },
    data: { label: 'Rollup' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '4-3',
    position: { x: 300, y: 300 },
    data: { label: 'Parcel' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '5-1',
    position: { x: 740, y: 300 },
    data: { label: 'Prettier' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '5-2',
    position: { x: 740, y: 350 },
    data: { label: 'ESLint' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '6',
    position: { x: 120, y: 450 },
    data: { label: 'React' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '7',
    position: { x: 520, y: 450 },
    data: { label: 'Vue' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '8',
    position: { x: 920, y: 450 },
    data: { label: 'Angular' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '9-1',
    position: { x: 20, y: 520 },
    data: { label: 'Redux' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '9-2',
    position: { x: 20, y: 570 },
    data: { label: 'Recoil' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '10',
    position: { x: 220, y: 520 },
    data: { label: 'Next.js' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '11',
    position: { x: 420, y: 520 },
    data: { label: 'VueX' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '12',
    position: { x: 620, y: 520 },
    data: { label: 'Nuxt.js' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '13-1',
    position: { x: 820, y: 520 },
    data: { label: 'RxJS' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '13-2',
    position: { x: 820, y: 570 },
    data: { label: 'NgRx' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '14',
    position: { x: 1020, y: 520 },
    data: { label: 'Universal' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '15-1',
    position: { x: 300, y: 670 },
    data: { label: 'Styled Components' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '15-2',
    position: { x: 300, y: 720 },
    data: { label: 'CSS Modules' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '15-3',
    position: { x: 300, y: 770 },
    data: { label: 'Styled JSX' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '15-4',
    position: { x: 300, y: 820 },
    data: { label: 'Emotion' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '16-1',
    position: { x: 520, y: 670 },
    data: { label: 'Reactstra' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '16-2',
    position: { x: 520, y: 720 },
    data: { label: 'MUI' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '16-3',
    position: { x: 520, y: 770 },
    data: { label: 'Tailwind CSS' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '16-4',
    position: { x: 520, y: 820 },
    data: { label: 'Chakra UI' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '17-1',
    position: { x: 740, y: 670 },
    data: { label: 'Bootstrap' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '17-2',
    position: { x: 740, y: 720 },
    data: { label: 'Materialize CSS' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '17-3',
    position: { x: 740, y: 770 },
    data: { label: 'Bulma' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '18',
    position: { x: 300, y: 920 },
    data: { label: 'GraphQL' },
    type: 'output',
  },
  {
    width: 160,
    height: 42,
    id: '19-1',
    position: { x: 200, y: 970 },
    data: { label: 'Apollo' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '19-2',
    position: { x: 400, y: 970 },
    data: { label: 'Relay Mode' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '20',
    position: { x: 740, y: 920 },
    data: { label: 'Mobile' },
    type: 'output',
  },
  {
    width: 160,
    height: 42,
    id: '21-1',
    position: { x: 640, y: 970 },
    data: { label: 'React Native' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '21-2',
    position: { x: 640, y: 1020 },
    data: { label: 'NativeScript' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '21-3',
    position: { x: 840, y: 970 },
    data: { label: 'Flutter' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '21-4',
    position: { x: 840, y: 1020 },
    data: { label: 'Ionic' },
    type: 'content',
  },
];

const edges = [
  {
    source: '1-1',
    sourceHandle: 'b',
    target: '1-2',
    targetHandle: 't',
    id: 'reactflow__edge-1-1b-1-2t',
    selected: false,
  },
  {
    source: '1-2',
    sourceHandle: 'b',
    target: '1-3',
    targetHandle: 't',
    id: 'reactflow__edge-1-2b-1-3t',
    selected: false,
  },
  {
    source: '3-1',
    sourceHandle: 'b',
    target: '3-2',
    targetHandle: 't',
    id: 'reactflow__edge-3-1b-3-2t',
    selected: false,
  },
  {
    source: '3-2',
    sourceHandle: 'b',
    target: '3-3',
    targetHandle: 't',
    id: 'reactflow__edge-3-2b-3-3t',
    selected: false,
  },
  {
    source: '4-1',
    sourceHandle: 'b',
    target: '4-2',
    targetHandle: 't',
    id: 'reactflow__edge-4-1b-4-2t',
    selected: false,
  },
  {
    source: '4-2',
    sourceHandle: 'b',
    target: '4-3',
    targetHandle: 't',
    id: 'reactflow__edge-4-2b-4-3t',
    selected: false,
  },
  {
    source: '5-1',
    sourceHandle: 'b',
    target: '5-2',
    targetHandle: 't',
    id: 'reactflow__edge-5-1b-5-2t',
    selected: false,
  },
];

export const DetailWrapper = styled.div`
  width: 942px;
  height: 800px;
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

const Subject = styled.div`
  width: 160px;
  height: 42px;
  padding: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  text-align: center;
`;

const FERoadmap = () => {
  const nodeTypes = useMemo(() => ({ content: ContentNode }), []);

  return (
    <DetailWrapper>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Controls />
      </ReactFlow>
    </DetailWrapper>
  );
};

export default FERoadmap;
