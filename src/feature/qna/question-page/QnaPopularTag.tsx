import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Button, Div, MiniTitle } from '../../../components';
import { logOnDev } from '../../../utils/logging';
import { getPopularTags } from '../../../apis/qna/qna';

const QnaPopularTagWrapper = styled(Div)`
  border-radius: 0.5rem;
`;

const QnaPopularTagTitle = styled(MiniTitle)`
  font-size: var(--fonts-body-base);
  line-height: var(--lineHights-body-base);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const TagsWrapper = styled.div`
  & > span {
    display: inline-block;
    margin-right: 0.5rem;
  }
`;

const QnaPopularTag = () => {
  const { data: qnaPopularTags, isLoading } = useQuery(
    ['question', 'popular', 'tag'] as const,
    getPopularTags
  );

  const handleClick = () => {
    logOnDev.log('버튼 테스트');
  };

  // /search?type=qna&keyword=&page=&size&
  return (
    <QnaPopularTagWrapper padding="1.25rem 1.625rem">
      <QnaPopularTagTitle sizeType="xl" textAlign="left">
        인기 태그
      </QnaPopularTagTitle>
      {isLoading && <div>로딩중..</div>}
      {isLoading || (
        <TagsWrapper>
          {qnaPopularTags?.tags.length === 0 && '태그가 없어요..'}
          {qnaPopularTags?.tags.map((tag) => (
            <Button
              key={tag}
              as="span"
              designType="grayFill"
              fontSize="var(--fonts-body-sm)"
              padding="	0.125rem 0.5rem"
              borderRadius="var(--borders-radius-base)"
              style={{ marginBottom: '0.5rem', fontWeight: '500' }}
              onClick={handleClick}
            >
              {tag}
            </Button>
          ))}
        </TagsWrapper>
      )}
    </QnaPopularTagWrapper>
  );
};

export default QnaPopularTag;
