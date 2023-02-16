import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { Modal, MiniTitle, Button, Input, Paragraph } from '../../../components';
import { toastState } from '../../../recoil';
import isModalOpenedState from '../../../recoil/isModalOpenedState';
import { answerCommit, putRepo } from '../../../apis/answer/answer';

const ModalBody = styled.div`
  display: flex;
  padding: 0 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .firstParagraph {
    margin-bottom: 1.25rem;
  }

  .check__button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.25rem;
    button:first-child {
      margin-right: 0.5rem;
    }
  }

  .pWrapper {
    display: flex;
  }
`;

const Highlight = styled.span`
  background-color: ${({ theme }) =>
    theme.isDark ? 'var(--colors-brand-500)' : 'var(--colors-brand-200)'};
  font-weight: 600;
`;

export const StyledInput = styled(Input)`
  width: 200px;
  text-align: center;
  padding: 0.5rem 0.25rem;
  border: none;
  border-bottom: 1px ${({ theme }) => theme.borderColor} solid;
  border-radius: 0;
  margin-top: 1rem;
  margin-right: 1rem;
`;

const CommitCheckModal = ({ questionId, answerId }: { questionId: number; answerId: number }) => {
  const [isSecondPage, setIsSecondPage] = useState(false);
  const [repoName, setRepoName] = useState('');
  const setIsCommitModalOpened = useSetRecoilState(isModalOpenedState);
  const setToast = useSetRecoilState(toastState);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoName(e.target.value);
  };

  const clickYesBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSecondPage(true);
  };

  const clickNoBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCommitModalOpened(false);
    setToast({ type: 'negative', message: '깃허브 자동 커밋을 하지 않습니다.', isVisible: true });

    // 백에 알려주기
    const data = {
      repoName: '',
      repoChecked: true,
    };
    putRepo(data);
  };

  const clickSaveBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCommitModalOpened(false);
    // 백에 알려주기
    const data = {
      repoName,
      repoChecked: true,
    };
    putRepo(data).then(() => answerCommit(questionId, answerId));
  };

  return (
    <Modal onClose={setIsCommitModalOpened} width="520px" height="280px">
      {/* 첫 번째 페이지 */}
      {isSecondPage || (
        <ModalBody>
          <MiniTitle sizeType="xl">
            답변 생성 시 깃허브에 <Highlight>자동으로 커밋</Highlight>하시겠습니까?
          </MiniTitle>
          <Paragraph className="firstParagraph" sizeType="base">
            설정 페이지에서 언제든지 변경할 수 있습니다.
          </Paragraph>
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
          <div className="pWrapper">
            <Paragraph sizeType="base">
              깃허브&nbsp;<Highlight>최상위 폴더</Highlight>에 레포지토리를 생성한 다음
            </Paragraph>
          </div>
          <MiniTitle sizeType="xl">레포지토리의 이름을 입력해주세요.</MiniTitle>
          <StyledInput onChange={inputChange} />
          <Button onClick={clickSaveBtn} margin="1.5rem 0 0 0">
            저장
          </Button>
        </ModalBody>
      )}
    </Modal>
  );
};

export default CommitCheckModal;
