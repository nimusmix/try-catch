import styled from 'styled-components';
// https://stackblitz.com/edit/typescript-dropdown?file=style.css
const Select = styled.select`
  padding: 3px;
  margin: 0;
  border-radius: 0.25rem;
  background: var(--colors-white-500);
  color: var(--colors-black-100);
  /* border:none; */
  border: 1px solid var(--colors-white-100);
  outline: none;
  display: inline-block;
  /* appearance:none; */
  cursor: pointer;
`;

const Label = styled.label`
  position: relative;

  :after {
    content: '>';
    font: 11px 'Consolas', monospace;
    color: var(--colors-white-100);
    /* border:none; */
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    right: 8px;
    top: 2px;
    padding: 0 0 2px;
    border-bottom: 1px solid var(--colors-black-100);
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

const Dropdown = () => {
  return (
    <Label>
      <Select>
        <option value="" hidden>
          Select...
        </option>
        <option value="1">Edit</option>
        <option value="2">Mail</option>
      </Select>
    </Label>
  );
};

export default Dropdown;
