import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Button, Checkbox, MiniTitle, Paragraph } from '../../components';
import { IBookmarkQuestion } from '../../interface/bookmark';
import { getBookmarkQuestionList, putBookmark } from '../../apis/bookmark/bookmark';
import BookmarkQuestionItem from './BookmarkQuestionItem';
import { ReactComponent as ImptyItem } from '../../assets/empty_bookmarkitem.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const QuestionItemWrapper = styled.div`
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

const BookmarkQuestionList = () => {
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
  };

  return (
    <Wrapper>
      {/* 북마크 질문 아이템이 있을 때 */}
      {bookmarkQuestionList && bookmarkQuestionList?.length > 0 && (
        <div style={{ width: '848px' }}>
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
        </div>
      )}
      {/* 북마크 질문 아이템이 없을 때 */}
      {bookmarkQuestionList?.length === 0 && (
        <div style={{ width: '848px', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              margin: '1rem 0 0',
            }}
          >
            <ImptyItem width="150" height="150" />
          </div>
          <MiniTitle sizeType="xl" textAlign="center" margin="0.5rem 0">
            북마크 질문 리스트가 비어있네요.
          </MiniTitle>
          <Paragraph sizeType="base" textAlign="center">
            관심있는 질문을 북마크하시면
            <br />
            더욱 편리하게 이용하실 수 있어요!
          </Paragraph>
        </div>
      )}
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
    </Wrapper>
  );
};

export default BookmarkQuestionList;
