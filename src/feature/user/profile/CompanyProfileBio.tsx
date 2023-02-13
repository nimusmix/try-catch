import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { postSubscribe, puttSubscribe } from '../../../apis/user/user';
import { Button, MiniTitle, Paragraph } from '../../../components';
import { ICompany } from '../../../interface/user';
import { isLoggedInState, toastState } from '../../../recoil';

const BioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    margin: 0.375rem 0;
  }
`;

const ProfileImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: var(--borders-radius-round);
  box-shadow: var(--shadows-black-lg);
  margin-bottom: 20px;
`;

const SubscriptionWrapper = styled.div`
  display: flex;
  margin: 0.25rem 0;

  & :first-child {
    margin-right: 0.5rem;
  }
`;

const UrlText = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor100};
  margin: 0.25rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.textColor100};
`;

const CompanyProfileBio = ({
  companyId,
  companyLogo,
  companyName,
  subscriptionCount,
  isSubscribe,
  companyBlog,
}: Partial<ICompany>) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [toast, setToast] = useRecoilState(toastState);

  const queryClient = useQueryClient();
  const updateSubscribe = (type: 'do' | 'cancel') => {
    const previousData = queryClient.getQueryData<ICompany>(['companyDetail', companyId]);

    if (previousData) {
      queryClient.setQueryData<ICompany>(['companyDetail', companyId], (oldData: any) => {
        return {
          ...oldData,
          isSubscribe: type === 'do',
          subscriptionCount:
            type === 'do' ? oldData.subscriptionCount + 1 : oldData.subscriptionCount - 1,
        };
      });
    }

    return {
      previousData,
    };
  };

  const { mutate: subscribe } = useMutation(['bookmark'], () => postSubscribe(companyId!), {
    onMutate: () => {
      updateSubscribe('do');
    },
  });

  const { mutate: unSubscribe } = useMutation(['cancelBookmark'], () => puttSubscribe(companyId!), {
    onMutate: () => updateSubscribe('cancel'),
  });

  const onClickSubscribeHandler = () => {
    if (!isLoggedIn) {
      setToast({
        type: 'negative',
        isVisible: true,
        message: '로그인 후 이용하실 수 있습니다.',
      });
    } else if (isSubscribe) {
      unSubscribe();
    } else {
      subscribe();
    }
  };
  return (
    <BioWrapper>
      <InfoWrapper>
        <ProfileImg src={companyLogo} />
        <MiniTitle sizeType="3xl">{companyName}</MiniTitle>
        <SubscriptionWrapper>
          <Paragraph sizeType="lg">구독</Paragraph>
          <Paragraph sizeType="lg" fontWeight="600">
            {subscriptionCount}
          </Paragraph>
        </SubscriptionWrapper>
        <UrlText sizeType="sm" as="a" href={companyBlog}>
          {companyBlog}
        </UrlText>
      </InfoWrapper>
      <Button
        designType={isSubscribe ? 'blueFill' : 'blueEmpty'}
        padding="0.25rem 1rem"
        borderRadius="var(--borders-radius-lg)"
        onClick={onClickSubscribeHandler}
      >
        {isSubscribe ? '구독중' : '구독'}
      </Button>
    </BioWrapper>
  );
};

export default CompanyProfileBio;
