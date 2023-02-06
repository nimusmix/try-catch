import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Button, Checkbox } from '../../components';
import { IBookmarkQuestion } from '../../interface/bookmark';
import { getBookmarkQuestionList } from '../../apis/bookmark/bookmark';
import BookmarkQuestionItem from './BookmarkQuestionItem';

// const bookmarkQuestionList = [
//   {
//     questionId: 43,
//     title: '드랍다운',
//     content: 'ㅁㄴㅇ\n',
//     tags: ['드랍다운'],
//     viewCount: 171,
//     likeCount: 0,
//     answerCount: 4,
//     createdAt: 1675540197000,
//   },
//   {
//     questionId: 2,
//     title: '정규식을 통해 이메일주소 삭제하는 방법!',
//     content:
//       '안녕하세요! 고수님들!\r\n\r\n@okky ,@오키와 같은 리플형식의 닉네임을 데이터 전처리하고 싶은데요\r\n\r\n@가나다라마바사 -> 나다라마바사\r\n\r\n처럼 @와 첫 한글자만 삭제됩니다..\r\n\r\n@가 포함된 단어 자체를 삭제하고 싶은데 방법 부탁드립니다.',
//     tags: [''],
//     viewCount: 160,
//     likeCount: 0,
//     answerCount: 2,
//     createdAt: 1675031089000,
//   },
//   {
//     questionId: 1,
//     title: 'react-hook-form 정규표현식 관리방법',
//     content:
//       '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
//       'react-hook-form에서 사용할 때 다양한 방법이 있는 것으로 알고 있는데 보통 보통...',
//     timestamp: 1675031089000,
//     viewCount: 12,
//     likeCount: 12,
//     answerCount: 12,
//     tags: ['react', '4242'],
//   },
// ];

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
  const { data: bookmarkQuestionList } = useQuery<Array<IBookmarkQuestion>>([
    'bookmarkQuestionList',
    () => getBookmarkQuestionList(),
  ] as const);

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

  const onDelete = () => {
    // 얘를 DB로 보내면 됨!
    const newQuestionItemList = bookmarkQuestionList?.filter(
      (el) => checkedItems.includes(el.questionId) === false
    );
  };

  return (
    <Wrapper>
      <div>
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
