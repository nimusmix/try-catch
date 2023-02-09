import styled from 'styled-components';
import BookmarkEmpty from './BookmarkEmpty';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const BookmarkFeedList = () => {
  return (
    <Wrapper>
      <BookmarkEmpty category="피드" />
    </Wrapper>
  );
};

export default BookmarkFeedList;
