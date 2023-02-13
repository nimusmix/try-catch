import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Button, Checkbox } from '../../components';
import { IBookmarkRoadMap } from '../../interface/bookmark';
import { getBookmarkRoadmapList, putBookmark } from '../../apis/bookmark/bookmark';
import BookmarkEmpty from './BookmarkEmpty';
import BookmarkRoadmapItem from './BookmarkRoadmapItem';
import { toastState } from '../../recoil';
import { Wrapper, ButtonWrapper, Btn } from './BookmarkQuestionList';

const RoadmapItemWrapper = styled.li`
  display: flex;
`;

// loacl UI 확인용 목업
// const bookmarkRoadmapList = [
//   {
//     roadmapId: 25,
//     author: {
//       userId: 2,
//       userName: 'nimusmix',
//       profileImage: 'https://avatars.githubusercontent.com/nimusmix',
//       companyName: '지나가던 개발자',
//       isFollowed: false,
//     },
//     title: '나의 첫 번째 로드맵',
//     tag: '가보자고',
//     likeCount: 0,
//     createdAt: 1675652541000,
//     updatedAt: 1675684943000,
//   },
// ];

const BookmarkRoadmapList = () => {
  const [toast, setToast] = useRecoilState(toastState);

  const { data: bookmarkRoadmapList } = useQuery<Array<IBookmarkRoadMap>>(
    ['bookmarkRoadmapList'] as const,
    getBookmarkRoadmapList
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
      bookmarkRoadmapList?.forEach((el) => allItems.push(el.roadmapId));
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
      queryClient.invalidateQueries(['bookmarkRoadmapList']);
    },
  });

  const onDelete = () => {
    const newRoadmapItemList = bookmarkRoadmapList?.filter(
      (el) => checkedItems.includes(el.roadmapId) === true
    );

    newRoadmapItemList?.map((item) => {
      return unBookmark.mutate({ id: item.roadmapId, type: 'ROADMAP' });
    });

    if (newRoadmapItemList && newRoadmapItemList?.length > 0) {
      setToast({
        type: 'positive',
        message: '북마크에서 제거되었습니다.',
        isVisible: true,
      });
    }
  };

  return (
    <Wrapper>
      {/* 북마크 로드맵 아이템이 있을 때 */}
      {bookmarkRoadmapList && bookmarkRoadmapList?.length > 0 && (
        <>
          <div>
            {bookmarkRoadmapList?.map((item) => {
              const isChecked = !!checkedItems.includes(item.roadmapId);

              return (
                <RoadmapItemWrapper key={item.roadmapId}>
                  <Checkbox
                    label={String(item.roadmapId)}
                    checked={isChecked}
                    onChange={onSingleCheck}
                  />
                  <Link to={`/roadmap/${item.author.userName}`}>
                    <BookmarkRoadmapItem {...item} />
                  </Link>
                </RoadmapItemWrapper>
              );
            })}
          </div>
          <ButtonWrapper>
            <Btn
              designType="blueEmpty"
              onClick={onAllCheck}
              checked={checkedItems.length === bookmarkRoadmapList?.length}
            >
              {checkedItems.length === bookmarkRoadmapList?.length ? '전체 해제' : '전체 선택'}
            </Btn>
            <Button designType="blueEmpty" onClick={onDelete}>
              선택 삭제
            </Button>
          </ButtonWrapper>
        </>
      )}
      {/* 북마크 로드맵 아이템이 없을 때 */}
      {bookmarkRoadmapList?.length === 0 && <BookmarkEmpty category="로드맵" />}
    </Wrapper>
  );
};

export default BookmarkRoadmapList;
