import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Layout from '../../layout/Layout';
import { MiniTitle, Input, Button, Paragraph } from '../../components';
import { IconCheck } from '../../components/icons/Icons';

const MUser = {
  userName: 'nimusmix',
  profieImage: 'https://avatars.githubusercontent.com/u/109320569?v=4',
  email: 'nimusmix@gmail.com',
  companyEmail: '0852145@ssafy.com',
  introduction: '저는 유플러스 프론트엔드 개발자 지망생.. 이에요.. 싸탈 가보자고?',
};

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
  const verifyCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  const introductionLength = watch('introduction')?.length;

  return (
    <Layout>
      <EditForm>
        <Img src={MUser.profieImage} />

        <InfoWrapper>
          <InputWrapper>
            <MiniTitle sizeType="2xl" fontWeight="600">
              닉네임
            </MiniTitle>
            <InfoInput
              {...register('userName', { minLength: 5, maxLength: 50 })}
              placeholder={MUser.userName}
            />
          </InputWrapper>

          <InputWrapper>
            <MiniTitle sizeType="2xl" fontWeight="600">
              이메일
            </MiniTitle>
            <InfoInput {...register('email')} placeholder={MUser.email} />
          </InputWrapper>

          {/* 회사 인증 여부에 따라 분기하기 */}
          <InputWrapper>
            <LabelWrapper>
              <MiniTitle sizeType="2xl" fontWeight="600">
                회사 인증
              </MiniTitle>
              {MUser.companyEmail && (
                <div style={{ display: 'flex' }}>
                  <SubText sizeType="sm" color="var(--colors-brand-500)" margin="0 0 0 0.5rem">
                    인증됨
                  </SubText>
                  <IconCheck color="var(--colors-brand-500)" />
                </div>
              )}
            </LabelWrapper>
            <CompanyConfirmWrapper>
              <InfoInput {...register('companyEmail')} placeholder={MUser.companyEmail} />
              <Button designType="blueEmpty" onClick={verifyCompany}>
                인증코드 발송
              </Button>
            </CompanyConfirmWrapper>
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
              placeholder={MUser.introduction}
            />
          </InputWrapper>
        </InfoWrapper>
        <Button>저장</Button>
      </EditForm>
    </Layout>
  );
};

export default ProfileEditPage;
