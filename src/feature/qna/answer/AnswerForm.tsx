import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import MilkdownEditor from '../../text-editor/MilkdownEditor';
import { Button, MiniTitle } from '../../../components';
import { postAnswer } from '../../../apis/answer/answer';
import { logOnDev } from '../../../utils/logging';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    margin-left: 0.5rem;
    margin-bottom: 1rem;
  }
  margin-bottom: 3rem;

  .milkdown-menu-wrapper {
    border-radius: 12px 12px 0 0;
    .milkdown {
      border-radius: 0;
    }
  }

  button {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;
// TODO 답변 작성 후 바로 조회하기
const AnswerForm = ({ questionId }: { questionId: string }) => {
  const [answerInput, setAnswerInput] = useState('');
  const queryClient = useQueryClient();
  const { mutate: addAnswer } = useMutation(
    postAnswer(questionId as string, { content: answerInput }),
    {
      onSuccess: () => {
        logOnDev.log('댓글 작성 성공');
        queryClient.invalidateQueries(['question', questionId]);
      },
    }
  );

  // 에러면 토스트

  const onClickAddAnswer = () => {
    addAnswer();
  };

  return (
    <Wrapper>
      <MiniTitle sizeType="xl" textAlign="left">
        답변하기
      </MiniTitle>
      <MilkdownEditor width="100%" setState={setAnswerInput} editable />
      <Button className="submit" onClick={onClickAddAnswer}>
        등&nbsp;&nbsp;록
      </Button>
    </Wrapper>
  );
};

export default AnswerForm;
