import styled from 'styled-components';
import { Button, MiniTitle } from '../../../components';
import Modal from '../../../components/modal/Modal';

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
const QuestionReportModal = ({ setToast, id, setIsReportModalOpen }: any, ref: any) => {
  // const { mutate: delQuestion } = useMutation(
  //   ['question', 'delete', `${questionId}`],
  //   deleteQuestion(questionId),
  //   {
  //     onSuccess: () => {
  //       navigate('/question', { replace: true });
  //       setToast({
  //         type: 'positive',
  //         isVisible: true,
  //         message: '질문을 삭제했습니다.',
  //       });
  //     },
  //     onError: () => {
  //       setToast({
  //         type: 'negative',
  //         isVisible: true,
  //         message: '질문 삭제 실패',
  //       });
  //     },
  //   }
  // );
  const onClickDelete = () => {
    setIsReportModalOpen(false);
  };
  return (
    <Modal onClose={setIsReportModalOpen} width="320px" height="180px">
      <ModalBody>
        <MiniTitle sizeType="xl" color="rgba(248, 81, 73, 0.8)" textAlign="left">
          신고🚨
        </MiniTitle>
        <div className="question__button-wrapper">
          <Button designType="redFill" onClick={onClickDelete}>
            신고하기
          </Button>
          <Button
            designType="grayFill"
            onClick={() => {
              setIsReportModalOpen(false);
            }}
          >
            취소
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default QuestionReportModal;
