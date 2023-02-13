import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IconSearch } from '../../components/icons/Icons';
import { Input } from '../../components';
import { isDarkState } from '../../recoil';

interface ISearchValue {
  keyword: string;
}

const TextAreaFocus = css`
  outline: 2px solid var(--colors-brand-500);
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
`;

const SearchIcon = styled.button`
  position: absolute;
  top: 50%;
  left: 0.625rem;
  transform: translateY(-50%);
`;

const StyledSearchBar = styled.div<{ isFocus: boolean }>`
  width: 17.75rem;
  height: 2.5rem;
  /* border-radius: 0.375rem; */
  border-width: 0.0625rem;
  border-color: ${({ theme: { borderColor } }) => borderColor};
  position: relative;
  margin: 12px auto 12px;

  border-radius: 40px;
  /* box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15); */
  /* background: #fff; */
  background-color: ${({ theme: { isDark } }) => (isDark ? 'rgba(36, 42, 54, 1)' : '#f7f8ff')};
  border: ${({ theme: { isDark } }) => (isDark ? '' : '1px solid var(--colors-brand-200)')};

  ${({ isFocus }) => isFocus && TextAreaFocus}
  input {
    border-radius: 40px;
    background-color: ${({ theme: { isDark } }) => (isDark ? 'rgba(36, 42, 54, 1)' : '#f7f8ff')};
    :focus {
      border: none;
      background: transparent;
    }
  }
  input:-webkit-autofill {
    box-shadow: 0 0 0 30px
      ${({ theme: { isDark } }) => (isDark ? 'rgba(36, 42, 54, 1)' : '#f7f8ff')} inset;
    -webkit-text-fill-color: ${({ theme: { textColor } }) => textColor};
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const FeedSearchInput = styled(Input)`
  position: absolute;
  left: 1.875rem;
  top: calc(50% - 1.125rem);
`;

const FeedSearchBar = () => {
  const isDark = useRecoilValue(isDarkState);
  const { register, handleSubmit, resetField } = useForm<ISearchValue>();
  const [isSearchFocus, setIsSearchFocus] = useState(false);

  const navigate = useNavigate();

  // const handleClick = () => resetField('keyword');

  const onValid = (data: ISearchValue) => {
    const encodeKeyword = encodeURIComponent(data.keyword);
    resetField('keyword');
    navigate(`/feed?keyword=${encodeKeyword}`);
  };

  const textField = register('keyword', { required: true, minLength: 1 });

  return (
    <form onSubmit={handleSubmit(onValid)} style={{ marginBottom: '1rem' }}>
      <StyledSearchBar isFocus={isSearchFocus}>
        <SearchIcon>
          <IconSearch
            color={isDark ? 'var(--colors-black-100)' : 'var(--colors-white-100)'}
            size="20"
          />
        </SearchIcon>
        <FeedSearchInput
          width="15.7rem"
          height="2.25rem"
          borderRadius="0.375rem"
          border="none"
          placeholder="키워드를 입력해주세요"
          {...textField}
          onFocus={() => setIsSearchFocus(true)}
          onBlur={(e) => {
            setIsSearchFocus(false);
            textField.onBlur(e);
          }}
        />
      </StyledSearchBar>
    </form>
  );
};

export default FeedSearchBar;
