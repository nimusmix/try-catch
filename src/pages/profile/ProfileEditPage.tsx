import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { MiniTitle, Input, Button, Paragraph } from '../../components';
import { accToken } from '../../recoil';
import { logOnDev } from '../../utils/logging';
import tokenDecode from '../../utils/tokenDecode';
import { IUserDetail } from '../../interface/user';
import { getUserDetail, patchUserDetail } from '../../apis/profile/profile';

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 500px;
  margin: 3rem auto;
`;

const Img = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  box-shadow: var(--shadows-black-2xl);
  margin-bottom: 3rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2.5rem;
`;

const InfoInput = styled(Input)`
  padding: 0.5rem 0.25rem;
  border: none;
  border-bottom: 1px ${({ theme }) => theme.borderColor} solid;
  border-radius: 0;
  margin-top: 0.5rem;
  margin-right: 1rem;
  /* color: ${({ theme }) => theme.textColor};
  background-color: transparent; */
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IntroductionInput = styled(Input)`
  text-align: start;
  vertical-align: top;
  width: 500px;
  height: 196px;
  margin-top: 0.5rem;
  padding: 1.5rem;
`;

const CompanyConfirmWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SubText = styled(Paragraph)`
  font-size: 14px;
  color: ${({ theme, color }) => color || theme.borderColor};
  margin: ${({ margin }) => margin || '0 0.5rem 0 1rem'};
`;

const ProfileEditPage = () => {
  const { register, handleSubmit, watch } = useForm();
  const token = useRecoilValue(accToken);
  const userId = tokenDecode(token, 'id');
  const { data: user, isLoading } = useQuery<IUserDetail>(
    ['userDetail'] as const,
    () => getUserDetail(userId!),
    {
      enabled: !!userId,
    }
  );

  const navi = useNavigate();
  const editProfile = useMutation(['editProfile', userId], patchUserDetail, {
    onSuccess: () => navi(`/profile/${user?.userName}`),
    onError: (error) => logOnDev.log(error),
  });

  const introductionLength = watch('introduction')?.length;

  const onValid = (data: { companyName?: string; introduction?: string }) => {
    const params = {
      companyName: data.companyName || user?.companyName,
      introduction: data.introduction || user?.introduction,
    };
    editProfile.mutate(params);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <EditForm onSubmit={handleSubmit(onValid)}>
        <Img src={user?.profileImg} />

        <InfoWrapper>
          <InputWrapper>
            <MiniTitle sizeType="2xl" fontWeight="600">
              현 직장
            </MiniTitle>
            <InfoInput {...register('companyName')} defaultValue={user?.companyName} />
          </InputWrapper>

          <InputWrapper>
            <LabelWrapper style={{ width: '500px' }}>
              <MiniTitle sizeType="2xl" fontWeight="600">
                자기소개
              </MiniTitle>
              <SubText sizeType="sm">{introductionLength || 0} / 200</SubText>
            </LabelWrapper>
            <IntroductionInput
              as="textarea"
              {...register('introduction', { maxLength: 200 })}
              defaultValue={user?.introduction}
              placeholder="자기소개를 입력해주세요."
            />
          </InputWrapper>
        </InfoWrapper>
        <Button>저장</Button>
      </EditForm>
    </Layout>
  );
};

export default ProfileEditPage;
