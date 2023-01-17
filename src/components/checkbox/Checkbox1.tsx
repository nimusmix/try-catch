// import React from 'react';
// import styled from 'styled-components';

// const CheckboxContainer = styled.div`
//   display: inline-block;
//   vertical-align: middle;
// `;

// const Icon = styled.svg`
//   fill: none;
//   stroke: white;
//   stroke-width: 2px;
// `;
// // Hide checkbox visually but remain accessible to screen readers.
// // Source: https://polished.js.org/docs/#hidevisually
// const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
//   border: 0;
//   clip: rect(0 0 0 0);
//   clip-path: inset(50%);
//   height: 1px;
//   margin: -1px;
//   overflow: hidden;
//   padding: 0;
//   position: absolute;
//   white-space: nowrap;
//   width: 1px;
// `;

// const StyledCheckbox = styled.div<{ checked: boolean }>`
//   display: inline-block;
//   width: 16px;
//   height: 16px;
//   background: ${({ checked }) => (checked ? `var(--colors-emph-500)` : 'papayawhip')};
//   border-radius: 3px;
//   transition: all 150ms;
//   font-family: SF Pro Display;
//   font-style: normal;
//   font-weight: 200;
//   font-size: 18px;
//   line-height: 21px;
//   text-align: center;
//   ${HiddenCheckbox}:focus + & {
//     box-shadow: 0 0 0 3px #acacac;
//   }

//   ${Icon} {
//     visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
//   }
// `;

// const Checkbox = ({
//   className,
//   checked,
//   onChange,
// }: {
//   className?: string;
//   checked: boolean;
//   onChange: (event: any) => void;
// }) => (
//   <CheckboxContainer className={className}>
//     <HiddenCheckbox checked={checked} onChange={onChange} />
//     <StyledCheckbox checked={checked}>
//       <Icon viewBox="0 0 24 24">
//         <polyline points="20 6 9 17 4 12" />
//       </Icon>
//     </StyledCheckbox>
//   </CheckboxContainer>
// );

// Checkbox.defaultProps = {
//   className: '',
// };

import React from 'react';

interface Props {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox = ({ isChecked, handleChange, label }: Props) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="checkbox" id={label} checked={isChecked} onChange={handleChange} />
    </div>
  );
};
export default Checkbox;
