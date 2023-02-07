import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Button, Checkbox } from '../../components';
import { IBookmarkQuestion } from '../../interface/bookmark';
import { getBookmarkQuestionList, putBookmark } from '../../apis/bookmark/bookmark';
import BookmarkQuestionItem from './BookmarkQuestionItem';
import BookmarkEmpty from './BookmarkEmpty';
import { toastState } from '../../recoil';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const QuestionItemWrapper = styled.li`
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

// local style 확인용 목업
// const bookmarkQuestionList = [
//   {
//     questionId: 42,
//     title: '오늘은 일요일',
//     content: '코딩하기 좋은 날!',
//     category: 'DEV',
//     tags: ['태그를', '잡으러', '바다로갈까나'],
//     viewCount: 70,
//     likeCount: 3,
//     answerCount: 3,
//     createdAt: 1675525624000,
//   },
//   {
//     questionId: 39,
//     title: 'asd',
//     content: 'asd\n',
//     category: 'DEV',
//     tags: [''],
//     viewCount: 24,
//     likeCount: 1,
//     answerCount: 0,
//     createdAt: 1675499610000,
//   },
// ];

const BookmarkQuestionList = () => {
  const [toast, setToast] = useRecoilState(toastState);

  const { data: bookmarkQuestionList } = useQuery<Array<IBookmarkQuestion>>(
    ['bookmarkQuestionList'] as const,
    getBookmarkQuestionList
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
      bookmarkQuestionList?.forEach((el) => allItems.push(el.questionId));
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
      queryClient.invalidateQueries(['bookmarkQuestionList']);
    },
  });

  const onDelete = () => {
    const newQuestionItemList = bookmarkQuestionList?.filter(
      (el) => checkedItems.includes(el.questionId) === true
    );

    newQuestionItemList?.map((item) => {
      return unBookmark.mutate({ id: item.questionId, type: 'QUESTION' });
    });

    if (newQuestionItemList && newQuestionItemList?.length > 0) {
      setToast({
        type: 'positive',
        message: '북마크에서 제거되었습니다.',
        isVisible: true,
      });
    }
  };

  return (
    <Wrapper>
      {/* 북마크 질문 아이템이 있을 때 */}
      {bookmarkQuestionList && bookmarkQuestionList?.length > 0 && (
        <>
          <ul>
            {bookmarkQuestionList?.map((questionItem) => {
              const isChecked = !!checkedItems.includes(questionItem.questionId);

              return (
                <QuestionItemWrapper key={questionItem.questionId}>
                  <Checkbox
                    label={String(questionItem.questionId)}
                    checked={isChecked}
                    onChange={onSingleCheck}
                  />
                  <Link to={`/question/${questionItem.questionId}`}>
                    <BookmarkQuestionItem {...questionItem} />
                  </Link>
                </QuestionItemWrapper>
              );
            })}
          </ul>
          <ButtonWrapper>
            <Btn
              designType="blueEmpty"
              onClick={onAllCheck}
              checked={checkedItems.length === bookmarkQuestionList?.length}
            >
              {checkedItems.length === bookmarkQuestionList?.length ? '전체 해제' : '전체 선택'}
            </Btn>
            <Button designType="blueEmpty" onClick={onDelete}>
              선택 삭제
            </Button>
          </ButtonWrapper>
        </>
      )}
      {/* 북마크 질문 아이템이 없을 때 */}
      {bookmarkQuestionList?.length === 0 && <BookmarkEmpty category="질문" />}
    </Wrapper>
  );
};

export default BookmarkQuestionList;
