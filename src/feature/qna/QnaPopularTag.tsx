import styled from 'styled-components';
import { Button, MiniTitle, Div } from '../../components';

import { ITag } from './QuestionList';

export interface IQnaPopularTag {
  tags: ITag[];
}

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

const QnaPopularTag = ({ tags }: IQnaPopularTag) => {
  const handleClick = () => {
    console.log('버튼 테스트');
  };
  // /search?type=qna&keyword=&page=&size&
  return (
    <QnaPopularTagWrapper padding="1.25rem 1.625rem">
      <QnaPopularTagTitle sizeType="xl" textAlign="left">
        인기 태그
      </QnaPopularTagTitle>
      <TagsWrapper>
        {tags.map(({ id, tagName }: ITag) => (
          <Button
            key={id}
            as="span"
            designType="grayFill"
            fontSize="var(--fonts-body-sm)"
            padding="	0.125rem 0.5rem"
            borderRadius="var(--borders-radius-base)"
            style={{ marginBottom: '0.5rem', fontWeight: '500' }}
            onClick={handleClick}
          >
            {tagName}
          </Button>
        ))}
      </TagsWrapper>
    </QnaPopularTagWrapper>
  );
};

export default QnaPopularTag;
