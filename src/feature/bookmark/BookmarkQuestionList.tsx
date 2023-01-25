import React, { useState } from 'react';
import styled from 'styled-components';
import { QuestionItem } from '../qna';
import { Checkbox, Button } from '../../components';

const questionItemList = [
  {
    id: 1,
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form에서 사용할 때 다양한 방법이 있는 것으로 알고 있는데 보통 보통...',
    timestamp: '9분 전',
    viewCount: 12,
    likeCount: 12,
    answerCount: 12,
    tags: [
      { id: 1, tagName: 'react' },
      { id: 2, tagName: 'react-hook-form' },
    ],
  },
  {
    id: 2,
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form에서 사용할 때 다양한 방법이 있는 것으로 알고 있는데 보통 보통...',
    timestamp: '9분 전',
    viewCount: 12,
    likeCount: 12,
    answerCount: 12,
    tags: [
      { id: 1, tagName: 'react' },
      { id: 2, tagName: 'react-hook-form' },
    ],
  },
  {
    id: 3,
    title: 'react-hook-form 정규표현식 관리방법',
    content:
      '안녕하세요. react-hook-form을 사용해서 프로젝트를 하고 있습니다. 정규 표현식을\n' +
      'react-hook-form에서 사용할 때 다양한 방법이 있는 것으로 알고 있는데 보통 보통...',
    timestamp: '9분 전',
    viewCount: 12,
    likeCount: 12,
    answerCount: 12,
    tags: [
      { id: 1, tagName: 'react' },
      { id: 2, tagName: 'react-hook-form' },
    ],
  },
];

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
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

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
      const allItems: number[] = [];
      questionItemList.forEach((el) => allItems.push(el.id));
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
    const newQuestionItemList = questionItemList.filter(
      (el) => checkedItems.includes(el.id) === false
    );
  };

  return (
    <Wrapper>
      <div>
        {questionItemList.map((questionItem) => {
          const isChecked = !!checkedItems.includes(questionItem.id);

          return (
            <QuestionItemWrapper key={questionItem.id}>
              <Checkbox label={questionItem.id} checked={isChecked} onChange={onSingleCheck} />
              <QuestionItem {...questionItem} />
            </QuestionItemWrapper>
          );
        })}
      </div>
      <ButtonWrapper>
        <Btn
          designType="blueEmpty"
          onClick={onAllCheck}
          checked={checkedItems.length === questionItemList.length}
        >
          {checkedItems.length === questionItemList.length ? '전체 해제' : '전체 선택'}
        </Btn>
        <Button designType="blueEmpty" onClick={onDelete}>
          선택 삭제
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default BookmarkQuestionList;
