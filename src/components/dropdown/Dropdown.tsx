import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconArrowDown, IconArrowUp } from '../icons/Icons';

export interface ISelectBoxProps {
  items: Array<{ value: string; text: string }>;
  width?: string;
  height?: string;
  fontSize?: string;
  changeOption: React.Dispatch<React.SetStateAction<string>>;
}

const OptionItem = styled.li`
  display: flex;
  align-items: center;
`;

const OptionList = styled.ul``;

const StyledSelectBox = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 1000;
  margin: 4px 0;
`;

const SelectBox = styled.div<Partial<ISelectBoxProps>>`
  position: relative;
  z-index: 10;
  width: ${({ width }) => width || '150px'};
  height: ${({ height }) => height};
  border-radius: 4px;
  border: 2px solid;
  border-color: ${({ theme: { borderColor } }) => borderColor};
  overflow: hidden;
  cursor: pointer;

  &.active {
    overflow: visible;
    z-index: 10;
    ${OptionList} {
      max-height: 500px;
    }
  }

  .selectBoxLabel {
    display: flex;
    align-items: center;
    width: inherit;
    height: inherit;
    border: 0 none;
    outline: 0 none;
    padding-left: 14px;
    padding-right: 8px;
    background: transparent;
    cursor: pointer;
  }

  * {
    box-sizing: border-box;
  }

  ${OptionList} {
    position: absolute;
    top: ${({ height }) => height || '34px'};
    left: 0;
    width: 100%;
    background: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-400)' : 'var(--colors-white-500)'};
    color: ${({ theme: { textColor300 } }) => textColor300};
    list-style-type: none;
    padding: 0;
    border-radius: var(--borders-radius-base);
    border: 1px solid ${({ theme: { borderColor } }) => borderColor};
    overflow: hidden;
    max-height: 0;
    transition: 0.3s ease-in;

    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #303030;
      border-radius: 45px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #303030;
    }
  }

  ${OptionItem} {
    border-bottom: 1px dashed var(--colors-black-500);
    padding: 4px 14px 4px;
    transition: 0.1s;
    height: ${({ height }) => height};
    font-size: ${({ fontSize }) => fontSize};

    :hover {
      background: ${({ theme: { isDark } }) =>
        isDark ? 'var(--colors-black-300)' : 'var(--colors-brand-100)'};
    }
    :last-child {
      border-bottom: 0 none;
    }
  }
`;

const Dropdown2 = ({ items, width, height, fontSize, changeOption }: ISelectBoxProps) => {
  const [isActive, setActive] = useState(false);
  const [selectItem, setSelectItem] = useState<string>(items[0].value || '');

  const handleClick = () => {
    const selectBox = document.getElementById('selectBox');
    if (selectBox?.classList.contains('active')) {
      selectBox?.classList.remove('active');
      setActive(false);
    } else {
      selectBox?.classList.add('active');
      setActive(true);
    }
  };

  const handleSelectOption = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.target as Element;
    const label = document.getElementsByClassName('selectBoxLabel')[0];
    const labelText = document.getElementsByClassName('labelText')[0];
    labelText.innerHTML = target.textContent || labelText?.textContent || '';
    label.parentElement?.classList.remove('active');
    setActive(false);
    setSelectItem(target.getAttribute('data-value') || '');
  };

  useEffect(() => {
    changeOption(selectItem);
  }, [selectItem, changeOption]);

  return (
    <SelectBox
      id="selectBox"
      className="selectBox "
      width={width}
      height={height}
      fontSize={fontSize}
    >
      <StyledSelectBox type="button" className="selectBoxLabel" onClick={handleClick}>
        <div className="labelText" style={{ fontSize: `${fontSize}` }}>
          {items[0].text || ''}
        </div>
        {isActive || <IconArrowDown />}
        {isActive && <IconArrowUp />}
      </StyledSelectBox>
      <OptionList>
        {items.map((item) => {
          return (
            <OptionItem onClick={handleSelectOption} key={item.value} data-value={item.value}>
              {item.text}
            </OptionItem>
          );
        })}
      </OptionList>
    </SelectBox>
  );
};

export default Dropdown2;
