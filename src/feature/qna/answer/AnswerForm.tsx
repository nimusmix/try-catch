import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
import { Button, MiniTitle } from '../../../components';
import { answerCommit, postAnswer } from '../../../apis/answer/answer';
import CommitCheckModal from './CommitCheckModal';
import isModalOpenedState from '../../../recoil/isModalOpenedState';

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

const Editor = styled.textarea`
  width: 100%;
  height: 200px;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'rgb(46, 52, 64)' : 'rgb(247, 248, 255)'};
  padding: 1rem;
  color: ${({ theme: { textColor } }) => textColor};
  resize: none;
  border-radius: 0.5rem 0.5rem 0 0;

  &:focus {
    outline: 1px solid var(--colors-brand-500);
  }

  &:focus + button {
    outline: 1px solid var(--colors-brand-500);
  }

  border-top: 1px solid
    ${({ theme: { isDark } }) => (isDark ? 'var(--colors-black-100)' : 'var(--colors-brand-200)')};
  border-left: 1px solid
    ${({ theme: { isDark } }) => (isDark ? 'var(--colors-black-100)' : 'var(--colors-brand-200)')};
  border-right: 1px solid
    ${({ theme: { isDark } }) => (isDark ? 'var(--colors-black-100)' : 'var(--colors-brand-200)')};
`;
// TODO 답변 작성 후 바로 조회하기
const AnswerForm = ({ questionId }: { questionId: string }) => {
  const [answerInput, setAnswerInput] = useState('');
  const [answerId, setAnswerId] = useState<number>();
  const [isCommitModalOpened, setIsCommitModalOpened] = useRecoilState(isModalOpenedState);

  const queryClient = useQueryClient();
  const { mutate: addAnswer } = useMutation(
    postAnswer(questionId as string, { content: answerInput }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['question', questionId]);
        setAnswerInput('');

        // 레포 체크되었고 커밋하기로 했으면 커밋 요청
        if (data.repoChecked && data.doCommit) {
          answerCommit(Number(questionId), data.answerId);
          // 레포 체크 안 되었으면 모달 오픈
        } else if (!data.repoChecked) {
          setAnswerId(data.answerId);
          setIsCommitModalOpened(true);
        }
      },
      onError: () => {},
    }
  );

  // 에러면 토스트
  const onClickAddAnswer = () => {
    addAnswer();
  };

  return (
    <>
      <Wrapper>
        <MiniTitle sizeType="xl" textAlign="left">
          답변하기
        </MiniTitle>
        <Editor value={answerInput} onChange={(e) => setAnswerInput(e.target.value)} />
        <Button className="submit" onClick={onClickAddAnswer}>
          등&nbsp;&nbsp;록
        </Button>
      </Wrapper>
      {isCommitModalOpened && (
        <CommitCheckModal questionId={Number(questionId)} answerId={answerId!} />
      )}
    </>
  );
};

export default AnswerForm;
