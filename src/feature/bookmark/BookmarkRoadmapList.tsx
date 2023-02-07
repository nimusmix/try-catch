import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Button, Checkbox } from '../../components';
import { IBookmarkRoadMap } from '../../interface/bookmark';
import { getBookmarkRoadmapList, putBookmark } from '../../apis/bookmark/bookmark';
import BookmarkEmpty from './BookmarkEmpty';
import BookmarkRoadmapItem from './BookmarkRoadmapItem';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const RoadmapItemWrapper = styled.li`
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & :first-child {
    margin-bottom: 0.5rem;
  }
`;

const Btn = styled(Button)<{ checked: boolean }>``;

// const bookmarkRoadmapList = [
//   {
//     roadmapId: 27,
//     author: {
//       userId: 4,
//       userName: 'hyeonaseome',
//       profileImage: 'https://avatars.githubusercontent.com/hyeonaseome',
//       companyName: 'default',
//       isFollowed: false,
//     },
//     title: '세젤귀 로드맵',
//     tag: '풀스택',
//     likeCount: 0,
//     createdAt: 1675696486000,
//     updatedAt: 1675728886000,
//   },
// ];

const BookmarkRoadmapList = () => {
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
      queryClient.invalidateQueries(['bookmarkRoadMapList']);
    },
  });

  const onDelete = () => {
    const newQuestionItemList = bookmarkRoadmapList?.filter(
      (el) => checkedItems.includes(el.roadmapId) === true
    );

    newQuestionItemList?.map((item) => {
      return unBookmark.mutate({ id: item.roadmapId, type: 'ROADMAP' });
    });
  };

  return (
    <Wrapper>
      {/* 북마크 로드맵 아이템이 있을 때 */}
      {bookmarkRoadmapList && bookmarkRoadmapList?.length > 0 && (
        <>
          <ul>
            {bookmarkRoadmapList?.map((item) => {
              const isChecked = !!checkedItems.includes(item.roadmapId);

              return (
                <RoadmapItemWrapper key={item.roadmapId}>
                  <Checkbox
                    label={String(item.roadmapId)}
                    checked={isChecked}
                    onChange={onSingleCheck}
                  />
                  <Link to={`/roadmap/${item.roadmapId}`}>
                    <BookmarkRoadmapItem {...item} />
                  </Link>
                </RoadmapItemWrapper>
              );
            })}
          </ul>
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
