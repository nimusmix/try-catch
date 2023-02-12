import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, MiniTitle, Paragraph, Modal } from '../../components';
import { deleteRoadmap } from '../../apis/roadmap/roadmap';

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
  .roadmap__button-wrapper {
    display: flex;
    justify-content: flex-end;
    button:first-child {
      margin-right: 0.5rem;
    }
  }
`;
const RoadmapDeleteModal = ({ setToast, setIsDeleteModalOpen }: any) => {
  const navigate = useNavigate();
  const { mutate: delRoadmap } = useMutation(['roadmap', 'delete'], deleteRoadmap(), {
    onSuccess: () => {
      navigate('/roadmap/list', { replace: true });
      setToast({
        type: 'positive',
        isVisible: true,
        message: '로드맵을 삭제했습니다.',
      });
    },
    onError: () => {
      setToast({
        type: 'negative',
        isVisible: true,
        message: '로드맵 삭제에 실패했습니다.',
      });
    },
  });
  const onClickDelete = () => {
    delRoadmap();
    setIsDeleteModalOpen(false);
  };
  return (
    <Modal onClose={setIsDeleteModalOpen} width="320px" height="180px">
      <ModalBody>
        <MiniTitle sizeType="xl" color="rgba(248, 81, 73, 0.8)" textAlign="left">
          정말 삭제하시겠습니까? 😥
        </MiniTitle>
        <Paragraph sizeType="base" textAlign="left">
          삭제하신 로드맵은 복구할 수 없어요!
        </Paragraph>
        <div className="roadmap__button-wrapper">
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

export default RoadmapDeleteModal;
