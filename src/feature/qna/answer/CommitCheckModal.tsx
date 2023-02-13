import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { Modal, MiniTitle, Button, Input, Paragraph } from '../../../components';
import { toastState } from '../../../recoil';

const ModalBody = styled.div`
  display: flex;
  padding: 0 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

  const clickSaveBtn = () => {
    console.log('저장 버튼 누름. 퀘스천 아이디 앤서 아이디 어떻게 가져오징');
  };

  return (
    <Modal onClose={setIsCommitModalOpened} width="560px" height="240px">
      {/* 첫 번째 페이지 */}
      {isSecondPage || (
        <ModalBody>
          <MiniTitle sizeType="xl">답변 생성 시 깃허브에 자동으로 커밋하시겠습니까?</MiniTitle>
          <Paragraph sizeType="base">설정 페이지에서 언제든지 변경할 수 있습니다.</Paragraph>
          <div className="check__button-wrapper">
            <Button onClick={clickYesBtn}>네</Button>
            <Button designType="blueEmpty" onClick={clickNoBtn}>
              아니오
            </Button>
          </div>
        </ModalBody>
      )}

      {/* 두 번째 페이지 */}
      {isSecondPage && (
        <ModalBody>
          <MiniTitle sizeType="xl">깃허브 최상위 폴더에 레포지토리를 생성한 다음</MiniTitle>
          <MiniTitle sizeType="xl">이름을 입력해주세요.</MiniTitle>
          <StyledInput />
          <Button onClick={clickSaveBtn}>저장</Button>
        </ModalBody>
      )}
    </Modal>
  );
};

export default CommitCheckModal;
