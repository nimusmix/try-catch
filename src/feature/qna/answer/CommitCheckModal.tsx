import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { Modal, MiniTitle, Button, Input } from '../../../components';
import { toastState } from '../../../recoil';

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

  .check__button-wrapper {
    display: flex;
    justify-content: flex-end;
    button:first-child {
      margin-right: 0.5rem;
    }
  }
`;

const StyledInput = styled(Input)`
  padding: 0.5rem 0.25rem;
  border: none;
  border-bottom: 1px ${({ theme }) => theme.borderColor} solid;
  border-radius: 0;
  margin-top: 0.5rem;
  margin-right: 1rem;
`;

const CommitCheckModal = ({ setIsCommitModalOpened }: any) => {
  const [isSecondPage, setIsSecondPage] = useState(false);
  const setToast = useSetRecoilState(toastState);

  const clickYesBtn = () => {
    setIsSecondPage(true);
  };

  const clickNoBtn = () => {
    setIsCommitModalOpened(false);
    setToast({ type: 'negative', message: '깃허브 자동 커밋을 하지 않습니다.', isVisible: true });
  };

  return (
    <Modal onClose={setIsCommitModalOpened}>
      <ModalBody>
        {/* 첫 번째 페이지 */}
        {isSecondPage || (
          <>
            <MiniTitle sizeType="xl">답변 생성 시 깃허브에 자동으로 커밋하시겠습니까?</MiniTitle>
            <div className="check__button-wrapper">
              <Button onClick={clickYesBtn}>네</Button>
              <Button designType="blueEmpty" onClick={clickNoBtn}>
                아니오
              </Button>
            </div>
          </>
        )}

        {/* 두 번째 페이지 */}
        {isSecondPage && (
          <>
            <MiniTitle sizeType="xl">
              깃허브 최상위 폴더에 레포지토리를 생성하고, 이름을 입력해주세요.
            </MiniTitle>
            <StyledInput />
          </>
        )}
      </ModalBody>
    </Modal>
  );
};

export default CommitCheckModal;
