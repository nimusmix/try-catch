import { MiniTitle, Paragraph } from '../../components';
import { ReactComponent as EmptyItem } from '../../assets/empty_bookmarkitem.svg';

interface IBookmarkEmptyProps {
  category: string;
}

const BookmarkEmpty = ({ category }: IBookmarkEmptyProps) => {
  return (
    <div style={{ width: '848px', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          margin: '1rem 0 0',
        }}
      >
        <EmptyItem width="150" height="150" />
      </div>
      <MiniTitle sizeType="xl" textAlign="center" margin="0.5rem 0">
        북마크 {category} 리스트가 비어있네요.
      </MiniTitle>
      <Paragraph sizeType="base" textAlign="center">
        관심있는 {category}을 북마크하시면
        <br />
        더욱 편리하게 이용하실 수 있어요!
      </Paragraph>
    </div>
  );
};

export default BookmarkEmpty;
