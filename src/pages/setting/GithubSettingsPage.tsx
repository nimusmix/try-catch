import styled from 'styled-components';
import { useState } from 'react';
import { SettingsBody } from './ThemeSettingsPage';
import { SettingHeader as AdvancedHeader } from '../../feature/settings';
import { Button, MiniTitle, Paragraph } from '../../components';
import { StyledInput } from '../../feature/qna/answer/CommitCheckModal';
import { putRepo } from '../../apis/answer/answer';

const AdvancedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 2rem 0;
`;

const SubText = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
  margin-bottom: 1rem;
`;

const RepoInput = styled(StyledInput)`
  text-align: start;
  margin-bottom: 3rem;
`;

const GithubSettingsPage = () => {
  const [repoName, setRepoName] = useState('');

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoName(e.target.value);
  };

  const clickSaveBtn = (e: React.MouseEvent) => {
    e.preventDefault();
    const data = {
      repoName,
      doCommit: true,
    };
    putRepo(data);
  };

  return (
    <SettingsBody>
      <AdvancedHeader title="깃허브 레포지토리 설정" />
      <AdvancedWrapper>
        <MiniTitle sizeType="xl" textAlign="left">
          답변 등록 시 커밋할 깃허브 레포지토리를 입력해주세요.
        </MiniTitle>
        <SubText sizeType="base">레포지토리는 깃허브 최상위 폴더에 위치해야 합니다.</SubText>
        <RepoInput onChange={inputChange} />
        <Button onClick={clickSaveBtn}>저장</Button>
      </AdvancedWrapper>
    </SettingsBody>
  );
};

export default GithubSettingsPage;
