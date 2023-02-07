import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Dropdown, DropLi, DropLiContainer, DropUl } from '../../../layout/header/MemberNavMenu';
import {
  IconDelete,
  IconMore,
  IconPen,
  IconReport,
  IconShare,
} from '../../../components/icons/Icons';
import useIsMe from '../../../hooks/useIsMe';
import { logOnDev } from '../../../utils/logging';
import Modal from '../../../components/modal/Modal';
import { Button, MiniTitle, Paragraph } from '../../../components';
import { deleteQuestion } from '../../../apis/qna/qna';
import { toastState } from '../../../recoil';

const DropContainer = styled(DropLiContainer)`
  padding: 0;
  min-width: 120px;
  background-color: ${({ theme: { isDark } }) => (isDark ? '' : 'var(--colors-brand-100)')};
  text-align: left;
  translate: -95px;
  border: none;
`;

const DropList = styled(DropLi)`
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme: { isDark } }) =>
      isDark ? 'var(--colors-black-400)' : 'var(--colors-brand-200)'};
  }

  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;

const ModalBody = styled.div`
  display: flex;
  padding: 0 2rem;
  flex-direction: column;
  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
  }
  .question__button-wrapper {
    display: flex;
    justify-content: flex-end;
    button:first-child {
      margin-right: 0.5rem;
    }
  }
`;

const QuestionDropdown = ({
  questionId,
  userId,
  answerCount,
}: {
  questionId: number;
  userId: number;
  answerCount: number;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const isMe = useIsMe(userId);
  const setToast = useSetRecoilState(toastState);
  const navigate = useNavigate();
  const { mutate: delQuestion } = useMutation(
    ['question', 'delete', `${questionId}`],
    deleteQuestion(questionId),
    {
      onSuccess: () => {
        navigate('/question', { replace: true });
        setToast({
          type: 'positive',
          isVisible: true,
          message: '질문을 삭제했습니다.',
        });
      },
      onError: () => {
        setToast({
          type: 'negative',
          isVisible: true,
          message: '질문 삭제 실패',
        });
      },
    }
  );
  const onClickModify = () => {
    dropdownRef.current!.style.display = 'none';
    logOnDev.log('수정');
  };

  const onClickDelete = () => {
    dropdownRef.current!.style.display = 'none';
    if (answerCount > 0) {
      setToast({
        type: 'negative',
        isVisible: true,
        message: '댓글이 있는 질문은 삭제할 수 없습니다.',
      });
    }
    delQuestion();
    setIsModalOpen(false);
  };

  const onClickCopy = () => {
    dropdownRef.current!.style.display = 'none';
    // 클립보드에 복사한다
    logOnDev.log('클립보드');
  };

  const onClickReport = () => {
    dropdownRef.current!.style.display = 'none';
    // 모달을 띄운다
    logOnDev.log('신고하기');
  };

  const onClickOpenDropDown = () => {
    dropdownRef.current!.style.display = 'block';
  };
  return (
    <Dropdown>
      {isModalOpen && (
        <Modal onClose={setIsModalOpen} width="320px" height="180px">
          <ModalBody>
            <MiniTitle sizeType="xl" color="rgba(248, 81, 73, 0.8)" textAlign="left">
              정말 삭제하시겠습니까? 😥
            </MiniTitle>
            <Paragraph sizeType="base" textAlign="left">
              삭제하신 질문은 복구할 수 없어요!
            </Paragraph>
            <div className="question__button-wrapper">
              <Button designType="redFill" onClick={onClickDelete}>
                삭제
              </Button>
              <Button
                designType="grayFill"
                onClick={() => {
                  setIsModalOpen(false);
                  dropdownRef.current!.style.display = 'none';
                }}
              >
                취소
              </Button>
            </div>
          </ModalBody>
        </Modal>
      )}
      {isModalOpen || null}
      <IconMore size="18" color="var(--colors-brand-500)" onClick={onClickOpenDropDown} />
      <DropContainer ref={dropdownRef}>
        <DropUl>
          {isMe && (
            <DropList onClick={onClickModify}>
              <IconPen />
              수정
            </DropList>
          )}
          {isMe && (
            <DropList onClick={() => setIsModalOpen(true)}>
              <IconDelete />
              삭제
            </DropList>
          )}
          <DropList onClick={onClickCopy}>
            <IconShare />
            공유하기
          </DropList>
          <DropList onClick={onClickReport}>
            <IconReport color="tomato" />
            신고하기
          </DropList>
        </DropUl>
      </DropContainer>
    </Dropdown>
  );
};

export default QuestionDropdown;
