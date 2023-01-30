import styled from 'styled-components';

interface IDropdownProps {
  items: Array<{ value: string | number; text: string }>;
  border?: string;
  width?: string;
}

const Select = styled.select<Partial<IDropdownProps>>`
  border: ${({ border }) => border};
  width: ${({ width }) => width};
  padding: 4px;
  padding-right: 24px;
  margin: 0;
  border-radius: 0.25rem;
  border-color: ${({ theme: { borderColor } }) => borderColor};
  background: ${({ theme: { bgColor } }) => bgColor};
  color: ${({ theme: { textColor100 } }) => textColor100}; //var(--colors-black-100);
  outline: none;
  display: inline-block;
  appearance: none;
  cursor: pointer;
`;

const Label = styled.label<Partial<IDropdownProps>>`
  position: relative;

  :after {
    border-bottom: ${({ border }) => border};
    border-bottom-color: ${({ theme: { borderColor } }) => borderColor};
    content: '>';
    font: 11px 'Consolas', monospace;
    color: ${({ theme: { borderColor } }) => borderColor};
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    right: 8px;
    top: 2px;
    padding: 0 0 2px;
    position: absolute;
    pointer-events: none;
  }
  :before {
    content: '';
    right: 6px;
    top: 0px;
    width: 20px;
    height: 20px;
    background: ${({ theme: { bgColor } }) => bgColor};
    position: absolute;
    pointer-events: none;
    display: block;
  }
`;

// items.value === 0이면 추후 hidden
const Dropdown = ({ items, border, width }: IDropdownProps) => {
  return (
    <Label border={border}>
      <Select border={border} width={width}>
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
  border: `1px solid`,
  width: 'auto',
};

export default Dropdown;
