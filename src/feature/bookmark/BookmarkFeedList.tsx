import styled from 'styled-components';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import BookmarkEmpty from './BookmarkEmpty';
import { toastState } from '../../recoil';
import { putBookmark, getBookmarkFeedList } from '../../apis/bookmark/bookmark';
import { Button, Checkbox } from '../../components';
import BookmarkFeedItem from './BookmarkFeedItem';
import { IBookmarkFeed } from '../../interface/bookmark';
import { Wrapper, ButtonWrapper, Btn } from './BookmarkQuestionList';

const FeedItemWrapper = styled.li`
  display: flex;
`;

const BookmarkFeedList = () => {
  const [toast, setToast] = useRecoilState(toastState);
  const { data: bookmarkFeedList } = useQuery<Array<IBookmarkFeed>>(
    ['bookmarkFeedList'] as const,
    getBookmarkFeedList
  );

  const [checkedItems, setCheckedItems] = useState<Array<number>>([]);

  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== id));
    }
  };

  const onSingleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSingleCheck(e.target.checked, Number(e.target.id));
  };

  const handleAllCheck = (checked: boolean) => {
    if (!checked) {
      const allItems: Array<number> = [];
      bookmarkFeedList?.forEach((el) => allItems.push(el.id));
      setCheckedItems(allItems);
    } else {
      setCheckedItems([]);
    }
  };

  const onAllCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleAllCheck((e.target as HTMLInputElement).checked);
  };
  const queryClient = useQueryClient();
  const unBookmark = useMutation(putBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bookmarkFeedList']);
    },
  });

  const onDelete = () => {
    const newFeedItemList = bookmarkFeedList?.filter((el) => checkedItems.includes(el.id) === true);

    newFeedItemList?.map((item) => {
      return unBookmark.mutate({ id: item.id, type: 'FEED' });
    });

    if (newFeedItemList && newFeedItemList?.length > 0) {
      setToast({
        type: 'positive',
        message: '북마크에서 제거되었습니다.',
        isVisible: true,
      });
    }
  };

  return (
    <Wrapper>
      {/* 북마크 피드 아이템이 있을 때 */}
      {bookmarkFeedList && bookmarkFeedList?.length > 0 && (
        <>
          <ul>
            {bookmarkFeedList?.map((feedItem) => {
              const isChecked = !!checkedItems.includes(feedItem.id);

              return (
                <FeedItemWrapper key={feedItem.id}>
                  <Checkbox
                    label={String(feedItem.id)}
                    checked={isChecked}
                    onChange={onSingleCheck}
                  />
                  <BookmarkFeedItem {...feedItem} />
                </FeedItemWrapper>
              );
            })}
          </ul>
          <ButtonWrapper>
            <Btn
              designType="blueEmpty"
              onClick={onAllCheck}
              checked={checkedItems.length === bookmarkFeedList?.length}
            >
              {checkedItems.length === bookmarkFeedList?.length ? '전체 해제' : '전체 선택'}
            </Btn>
            <Button designType="blueEmpty" onClick={onDelete}>
              선택 삭제
            </Button>
          </ButtonWrapper>
        </>
      )}
      {/* 북마크 피드 아이템이 없을 때 */}
      {bookmarkFeedList?.length === 0 && <BookmarkEmpty category={1} />}
    </Wrapper>
  );
};

export default BookmarkFeedList;
