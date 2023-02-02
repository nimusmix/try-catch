import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from '../../components/icons/Icons';
import { Input } from '../../components';
import { isDarkState } from '../../recoil';

interface ISearchValue {
  keyword: string;
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

interface IFeedSearchBarProps {
  checkedItems: Array<number>;
}

const FeedSearchBar = ({ checkedItems }: IFeedSearchBarProps) => {
  const isDark = useRecoilValue(isDarkState);
  const { register, handleSubmit } = useForm<ISearchValue>();

  const navigate = useNavigate();

  // const handleClick = () => resetField('keyword');
  // const onSubmit = handleSubmit(() => {});

  const subscribe = checkedItems.includes(1);
  const advanced = checkedItems.includes(2);
  const onValid = (data: ISearchValue) => {
    navigate(`/feed?keyword=${data.keyword}&subscribe=${subscribe}&advanced=${advanced}`);
  };
  return (
    <form onSubmit={handleSubmit(onValid)} style={{ marginBottom: '1rem' }}>
      <StyledSearchBar>
        <SearchIcon>
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
          {...register('keyword', { required: true, minLength: 1 })}
        />
      </StyledSearchBar>
    </form>
  );
};

export default FeedSearchBar;
