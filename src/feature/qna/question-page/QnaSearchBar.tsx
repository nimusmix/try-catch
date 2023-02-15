import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { IconRefresh, IconSearch } from '../../../components/icons/Icons';
import { Button, Input, Paragraph } from '../../../components';
import { isDarkState } from '../../../recoil';
import qnaSearchKeywordState from '../../../recoil/qnaSearchKeywordState';
import { media } from '../../../utils/media';

interface ISearchValue {
  data: string;
}

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0.625rem;
  transform: translateY(-50%);
`;

const StyledSearchBar = styled.div`
  /* width: 36.25rem; */
  width: 36.5rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  border-width: 0.0625rem;
  border-color: ${({ theme: { borderColor } }) => borderColor};
  position: relative;
  margin: 0 auto 0 0;

  ${media.phone`
    margin-right: 1rem;
  `}
`;

const StyledSearch = styled.div`
  display: flex;
  width: 41.25rem;
  padding-bottom: 1rem;
  ${media.phone`
    width: 100%;
    input{
      width: 90%;
    }
    
    button{
      width: 80px;
    }
  `}
`;

const KeywordWrapper = styled.span`
  display: flex;
  justify-content: space-between;

  .result-message {
    display: flex;
    font-weight: 600;
    .blue {
      display: inline-block;
      margin-right: 0.2rem;
      font-size: 1.3rem;
      font-weight: 700;
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  & > div:first-child {
    display: flex;
  }

  p {
    margin-right: 0.25rem;
  }
`;

const SearchBarForm = styled.form`
  padding-top: 3rem;
  margin-bottom: 0.25rem;
  position: sticky;
  top: 3rem;
  background: ${({ theme: { bgColor } }) => bgColor};
  opacity: 0.9;
  backdrop-filter: blur(30px);

  ${media.phone`
    display: flex;
    flex-direction: column;
    top: 9rem;
    padding: 3rem 1rem 0 1rem;
    
    & > div {
      display: flex;
      justify-content: center;
    }
  `}
`;

const QnaSearchBar = () => {
  const [keyword, setKeyword] = useRecoilState(qnaSearchKeywordState);
  const isDark = useRecoilValue(isDarkState);
  const { register, handleSubmit, resetField } = useForm<ISearchValue>();

  const onSubmit = (data: ISearchValue) => {
    if (!data.data) {
      // eslint-disable-next-line no-param-reassign
      data.data = '';
    }
    setKeyword(data.data.toLocaleLowerCase());
    resetField('data');
  };
  const { ...inputProps } = register('data');

  return (
    <SearchBarForm onSubmit={handleSubmit(onSubmit)}>
      <StyledSearch>
        <StyledSearchBar>
          <SearchIcon>
            <IconSearch
              color={isDark ? 'var(--colors-black-100)' : 'var(--colors-white-100)'}
              size="20"
            />
          </SearchIcon>
          <Input
            width="34.25rem"
            height="2.25rem"
            borderRadius="0.375rem"
            border="none"
            placeholder="Search..."
            style={{ position: 'absolute', left: '1.875rem', top: 'calc(50% - 1.125rem)' }}
            {...inputProps}
          />
        </StyledSearchBar>
        <Button fontSize="var(--fonts-body-base)" padding="0.25rem 1.125rem">
          검색
        </Button>
      </StyledSearch>
      <KeywordWrapper>
        <div>
          <Paragraph sizeType="base">
            {keyword.length > 0 ? (
              <Paragraph as="span" sizeType="lg" className="result-message">
                &apos;<b className="blue">{keyword}</b>&apos; 검색 결과
              </Paragraph>
            ) : (
              <Button
                as="span"
                designType="grayFill"
                fontSize="var(--fonts-body-sm)"
                padding="0 0.5rem"
                borderRadius="var(--borders-radius-base)"
                style={{ marginBottom: '0.5rem', fontWeight: '500' }}
              >
                전체
              </Button>
            )}
          </Paragraph>
        </div>
        {keyword.length > 0 ? (
          <Button
            onClick={() => setKeyword('')}
            as="span"
            designType="redFill"
            fontSize="var(--fonts-body-sm)"
            padding="0 0.5rem"
            borderRadius="var(--borders-radius-base)"
            style={{ marginBottom: '0.5rem', fontWeight: '500' }}
          >
            초기화
            <IconRefresh />
          </Button>
        ) : null}
      </KeywordWrapper>
    </SearchBarForm>
  );
};

export default QnaSearchBar;
