import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import MilkdownEditor from '../../text-editor/MilkdownEditor';
import { Button, MiniTitle } from '../../../components';
import { postAnswer } from '../../../apis/answer/answer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    margin-left: 0.5rem;
    margin-bottom: 1rem;
  }
  margin-bottom: 3rem;

  button.submit {
    translate: 0 -1rem;
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;
const AnswerForm = ({ questionId }: { questionId: string }) => {
  const [answerInput, setAnswerInput] = useState('');
  const {
    mutate: addAnswer,
    isSuccess,
    isError,
  } = useMutation(postAnswer(questionId as string, { content: answerInput }));

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
