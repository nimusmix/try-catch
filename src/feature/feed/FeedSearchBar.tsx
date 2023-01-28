import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { IconSearch } from '../../components/icons/Icons';
import { Input } from '../../components';
import { isDarkState } from '../../recoil';

interface ISearchValue {
  data: string;
}

const SearchIcon = styled.button`
  position: absolute;
  top: 50%;
  left: 0.625rem;
  transform: translateY(-50%);
`;

const StyledSearchBar = styled.div`
  width: 17.75rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  border-width: 0.0625rem;
  border-color: ${({ theme: { borderColor } }) => borderColor};
  position: relative;
  margin: 0 auto 0 0;
`;

const FeedSearchBar = () => {
  const isDark = useRecoilValue(isDarkState);
  const { register, handleSubmit, resetField } = useForm<ISearchValue>();

  const handleClick = () => resetField('data');
  const onSubmit = handleSubmit(() => {});

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '1rem' }}>
      <StyledSearchBar>
        <SearchIcon onClick={handleClick}>
          <IconSearch
            color={isDark ? 'var(--colors-black-100)' : 'var(--colors-white-100)'}
            size="20"
          />
        </SearchIcon>
        <Input
          width="15.5rem"
          height="2.25rem"
          borderRadius="0.375rem"
          border="none"
          placeholder="Search..."
          style={{ position: 'absolute', left: '1.875rem', top: 'calc(50% - 1.125rem)' }}
          {...register('data')}
        />
      </StyledSearchBar>
    </form>
  );
};

export default FeedSearchBar;
