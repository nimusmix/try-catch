import styled from 'styled-components';
import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const StyledInput = styled.input`
  width: 160px;
  padding: 0.5rem;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.bgColor};
  text-align: center;
  border: 1px var(--colors-brand-500) solid;
  border-radius: var(--borders-radius-base);
`;

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
        <StyledInput id="text" name="text" onChange={onChange} value={data.label || ''} />
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
      <Handle type="source" position={Position.Right} id="r" />
    </>
  );
};

export default TextUpdaterNode;
