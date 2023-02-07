import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, MiniTitle, Paragraph } from '../../../components';
import Modal from '../../../components/modal/Modal';
import { deleteQuestion } from '../../../apis/qna/qna';

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
const QuestionDeleteModal = ({ answerCount, setToast, questionId, setIsDeleteModalOpen }: any) => {
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
  const onClickDelete = () => {
    if (answerCount > 0) {
      setToast({
        type: 'negative',
        isVisible: true,
        message: '댓글이 있는 질문은 삭제할 수 없어요',
      });
    }
    delQuestion();
    setIsDeleteModalOpen(false);
  };
  return (
    <Modal onClose={setIsDeleteModalOpen} width="320px" height="180px">
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
              setIsDeleteModalOpen(false);
            }}
          >
            취소
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default QuestionDeleteModal;
