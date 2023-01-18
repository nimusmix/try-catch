import styled from 'styled-components';

const Select = styled.select<{ border?: string }>`
  padding: 4px;
  padding-right: 24px;
  margin: 0;
  border-radius: 0.25rem;
  background: var(--colors-white-500);
  color: var(--colors-black-100);
  border: ${({ border }) => border || '1px solid var(--colors-white-100)'};
  outline: none;
  display: inline-block;
  appearance: none;
  cursor: pointer;
`;

const Label = styled.label<{ border?: string }>`
  position: relative;

  :after {
    content: '>';
    font: 11px 'Consolas', monospace;
    color: var(--colors-white-100);
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    right: 8px;
    top: 2px;
    padding: 0 0 2px;
    border-bottom: ${({ border }) => border || '1px solid var(--colors-white-100)'};
    position: absolute;
    pointer-events: none;
  }
  :before {
    content: '';
    right: 6px;
    top: 0px;
    width: 20px;
    height: 20px;
    background: var(--colors-white-500);
    position: absolute;
    pointer-events: none;
    display: block;
  }
`;

interface IDropdownProps {
  items: any[];
  border?: string;
}

// items.value === 0이면 추후 hidden
const Dropdown = ({ items, border }: IDropdownProps) => {
  return (
    <Label border={border}>
      <Select border={border}>
        {items.map((item) =>
          item.value === 0 ? (
            <option key={item.value} value={item.value} hidden>
              {item.text}
            </option>
          ) : (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          )
        )}
      </Select>
    </Label>
  );
};

Dropdown.defaultProps = {
  border: `1px solid var(--colors-white-100)`,
};

export default Dropdown;
