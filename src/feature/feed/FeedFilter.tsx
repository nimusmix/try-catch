import { forwardRef } from 'react';
import styled from 'styled-components';
import { MiniTitle } from '../../components';

interface IFeedFilterProps {
  currentOption: string | null;
  handleFilterOptionClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const filterOptions = [
  {
    id: 1,
    option: '나의 관심순',
  },
  {
    id: 2,
    option: '최신순',
  },
  {
    id: 3,
    option: '구독',
  },
];

const Item = styled.button<{ option: string }>`
  padding: 0rem 0.8rem;
  transition: color, background-color 0.1s ease-in;
  border-right: 0.8px solid;
  align-items: center;
  border-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-brand-100)' : 'var(--colors-black-100)'};

  border-right: ${({ option }) => (option === '구독' ? 'none' : '0.8px solid')};

  &.active > h3,
  &:hover > h3 {
    color: var(--colors-brand-500);
    font-weight: 700;
  }

  & > h3 {
    color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-brand-100)' : 'var(--colors-black-100)'};
    font-weight: 400;
  }
`;

const FeedFilter = forwardRef(
  ({ currentOption, handleFilterOptionClick }: IFeedFilterProps, ref: any) => {
    return (
      <div ref={ref}>
        {filterOptions.map(({ id, option }) => {
          return (
            <Item
              key={id}
              onClick={handleFilterOptionClick}
              className={currentOption === option ? 'active' : ''}
              option={option}
            >
              <MiniTitle
                sizeType="xl"
                color="var(--colors-black-100)"
                data-name={option}
                style={{
                  fontSize: 'var(--fonts-body-base)',
                  lineHeight: 'var(--fonts-body-base)',
                }}
              >
                {option}
              </MiniTitle>
            </Item>
          );
        })}
      </div>
    );
  }
);

FeedFilter.displayName = 'FeedFilter';

export default FeedFilter;
