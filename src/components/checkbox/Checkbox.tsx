/* TODO Checkbox Custom */
import React from 'react';

interface ICheckboxProps {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const Checkbox = ({ isChecked, handleChange, label }: ICheckboxProps) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type="checkbox" id={label} checked={isChecked} onChange={handleChange} />
    </div>
  );
};
export default Checkbox;
