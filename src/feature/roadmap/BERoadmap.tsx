import { NodeType } from '@milkdown/prose/model';
import { useMemo } from 'react';
import styled from 'styled-components';
import ReactFlow, { Controls, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { DetailWrapper } from './FERoadmap';

interface INode {
  width: number;
  height: number;
  id: string;
  position: { x: number; y: number };
  data: { value: string; label: string };
  type: string;
  positionAbsolute: { x: number; y: number };
  selected: boolean;
  dragging: boolean;
}

const nodes = [
  {
    width: 160,
    height: 42,
    id: '1',
    position: { x: 300, y: 50 },
    data: { label: 'Rust' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '2',
    position: { x: 300, y: 100 },
    data: { label: 'Go' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '3',
    position: { x: 520, y: 50 },
    data: { label: 'Java' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '4',
    position: { x: 520, y: 100 },
    data: { label: 'C#' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '5',
    position: { x: 520, y: 150 },
    data: { label: 'PHP' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '6',
    position: { x: 740, y: 50 },
    data: { label: 'JavaScript' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '7',
    position: { x: 740, y: 100 },
    data: { label: 'Python' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '8',
    position: { x: 740, y: 150 },
    data: { label: 'Ruby' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '9',
    position: { x: 160, y: 250 },
    data: { label: '관계형 데이터베이스' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '10-1',
    position: { x: 80, y: 300 },
    data: { label: 'PostgreSQL' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '10-2',
    position: { x: 80, y: 350 },
    data: { label: 'MySQL' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '10-3',
    position: { x: 80, y: 400 },
    data: { label: 'MariaDB' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '10-4',
    position: { x: 240, y: 300 },
    data: { label: 'MS SQL' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '10-5',
    position: { x: 240, y: 350 },
    data: { label: 'Oracle' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '11',
    position: { x: 520, y: 250 },
    data: { label: 'NoSQL 데이터베이스' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '12-1',
    position: { x: 440, y: 300 },
    data: { label: 'MongoDB' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '12-2',
    position: { x: 440, y: 350 },
    data: { label: 'RethinkDB' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '12-3',
    position: { x: 600, y: 300 },
    data: { label: 'CouchDB' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '12-4',
    position: { x: 600, y: 350 },
    data: { label: 'DynamoDB' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '13',
    position: { x: 880, y: 250 },
    data: { label: '데이터베이스 심화' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '14-1',
    position: { x: 800, y: 300 },
    data: { label: 'ORMs' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '14-2',
    position: { x: 800, y: 350 },
    data: { label: 'ACID' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '14-3',
    position: { x: 800, y: 400 },
    data: { label: '트랜잭션' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '14-4',
    position: { x: 960, y: 300 },
    data: { label: 'N+1 문제' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '14-5',
    position: { x: 960, y: 350 },
    data: { label: '데이터베이스 정규화' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '14-6',
    position: { x: 960, y: 400 },
    data: { label: 'Index와 동작 방식' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '15',
    position: { x: 320, y: 500 },
    data: { label: '로그인' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '16-1',
    position: { x: 240, y: 550 },
    data: { label: 'Cookie 기반' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '16-2',
    position: { x: 240, y: 600 },
    data: { label: 'OAuth' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '16-3',
    position: { x: 240, y: 650 },
    data: { label: '기본 인증' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '16-4',
    position: { x: 240, y: 700 },
    data: { label: '토큰 기반 인증' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '16-5',
    position: { x: 400, y: 550 },
    data: { label: 'JWT' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '16-6',
    position: { x: 400, y: 600 },
    data: { label: 'OpenID' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '16-7',
    position: { x: 400, y: 650 },
    data: { label: 'SAML' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '17',
    position: { x: 720, y: 500 },
    data: { label: 'APIs' },
    type: 'output',
  },
  {
    width: 160,
    height: 42,
    id: '18-1',
    position: { x: 640, y: 550 },
    data: { label: 'HATEOAS' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '18-2',
    position: { x: 640, y: 600 },
    data: { label: 'Open API와 Swagger' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '18-3',
    position: { x: 640, y: 650 },
    data: { label: '인증' },
    type: 'output',
  },
  {
    width: 160,
    height: 42,
    id: '18-4',
    position: { x: 800, y: 550 },
    data: { label: 'REST' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '18-5',
    position: { x: 800, y: 600 },
    data: { label: 'JSON APIs' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '18-6',
    position: { x: 800, y: 650 },
    data: { label: 'SOAP' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '19',
    position: { x: 320, y: 800 },
    data: { label: '캐싱' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '20',
    position: { x: 520, y: 800 },
    data: { label: '테스팅' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '21',
    position: { x: 720, y: 800 },
    data: { label: '웹 보안 지식' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '22',
    position: { x: 320, y: 900 },
    data: { label: '디자인과 개발 원칙' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '22-1',
    position: { x: 240, y: 950 },
    data: { label: 'GOF 디자인 패턴' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '22-2',
    position: { x: 240, y: 1000 },
    data: { label: '도메인 주도 설계' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '22-3',
    position: { x: 240, y: 1050 },
    data: { label: '테스트 주도 개발' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '22-4',
    position: { x: 400, y: 950 },
    data: { label: 'SOLID' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '22-5',
    position: { x: 400, y: 1000 },
    data: { label: 'KISS' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '22-6',
    position: { x: 400, y: 1050 },
    data: { label: 'YAGNI' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '22-7',
    position: { x: 400, y: 1100 },
    data: { label: 'DRY' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '23',
    position: { x: 720, y: 900 },
    data: { label: '아키텍처 패턴' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '24-1',
    position: { x: 640, y: 950 },
    data: { label: '모놀리식 애플리케이션' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '24-2',
    position: { x: 640, y: 1000 },
    data: { label: '마이크로서비스' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '24-3',
    position: { x: 640, y: 1050 },
    data: { label: 'SOA' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '24-4',
    position: { x: 800, y: 950 },
    data: { label: 'CQRS와 이벤트 소싱' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '24-5',
    position: { x: 800, y: 1000 },
    data: { label: '서버리스' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '25',
    position: { x: 320, y: 1200 },
    data: { label: 'Search Engine' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '26-1',
    position: { x: 320, y: 1250 },
    data: { label: '일래스틱서치' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '26-2',
    position: { x: 320, y: 1300 },
    data: { label: 'Solr' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '27',
    position: { x: 520, y: 1200 },
    data: { label: '메시지 브로커' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '28-1',
    position: { x: 520, y: 1250 },
    data: { label: 'RabbitMQ' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '28-2',
    position: { x: 520, y: 1300 },
    data: { label: 'Kafka' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '29',
    position: { x: 720, y: 1200 },
    data: { label: '가상화' },
    type: 'content',
  },
  {
    width: 160,
    height: 42,
    id: '30',
    position: { x: 720, y: 1250 },
    data: { label: 'Docker' },
    type: 'content',
  },
];

const edges = [
  {
    source: '1',
    sourceHandle: 'b',
    target: '2',
    targetHandle: 't',
    id: 'reactflow__edge-1b-2t',
    selected: false,
  },
];

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
// const Subject = styled.div`
//   width: 160px;
//   height: 42px;
//   padding: 0.5rem;
//   color: ${({ theme }) => theme.textColor};
//   text-align: center;
// `;

const BERoadmap = () => {
  const nodeTypes = useMemo(() => ({ content: ContentNode }), []);

  return (
    <DetailWrapper>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Controls />
      </ReactFlow>
    </DetailWrapper>
  );
};

export default BERoadmap;
