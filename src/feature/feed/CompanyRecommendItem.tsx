import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Button, Paragraph } from '../../components';
import { IFeedCompany } from '../../interface/feed';
import { COMPANY } from '../../constant/company';
import { toastState, isLoggedInState } from '../../recoil';
import { postSubscribe, puttSubscribe } from '../../apis/user/user';

const CompanyName = styled(Paragraph)`
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
`;

const CompanyWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.3rem 0rem;
  cursor: pointer;
  :hover ${CompanyName} {
    color: var(--colors-brand-500);
    transition: color, background-color 0.1s ease-in;
  }
`;

const CompanyImg = styled.img`
  width: 40px;
  height: 40px;
  padding: 0.2rem;
  background-color: ${({ theme: { isDark } }) =>
    isDark ? 'var(--colors-brand-100)' : 'var(--colors-white-500)'};
  border-radius: var(--borders-radius-base);
  box-shadow: ${({ theme: { isDark } }) =>
    isDark
      ? 'rgba(39, 110, 226, 0.2) 0px 0px 0px 2px, rgba(39, 110, 226, 0.3) 0px 4px 6px -1px, rgba(39, 110, 226, 0.08) 0px 1px 0px inset;'
      : 'rgba(0, 0, 0, 0.16) 0px 1px 4px'};
  margin: 0 1rem 0 0.3rem;
`;

const FollowButton = styled(Button)``;

const FollowButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CompanyItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CompanyRecommendItem = ({ companyId, logoSrc, companyName, isFollowed }: IFeedCompany) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const [toast, setToast] = useRecoilState(toastState);

  const queryClient = useQueryClient();
  const updateSubscribe = (type: 'do' | 'cancel') => {
    const previousData = queryClient.getQueryData<IFeedCompany>(['companyRecommendList']);
  };

  const { mutate: subscribe } = useMutation(
    ['post', 'subscribe', companyName],
    () => postSubscribe(companyId!),
    {
      onMutate: () => {
        updateSubscribe('do');
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['companyRecommendList']);
        queryClient.invalidateQueries('feed');
      },
    }
  );

  const { mutate: unSubscribe } = useMutation(
    ['put', 'subscribe', companyName],
    () => puttSubscribe(companyId!),
    {
      onMutate: () => updateSubscribe('cancel'),
      onSuccess: () => {
        queryClient.invalidateQueries(['companyRecommendList']);
        queryClient.invalidateQueries('feed');
      },
    }
  );

  const onClickSubscribeHandler = () => {
    if (!isLoggedIn) {
      setToast({
        type: 'negative',
        isVisible: true,
        message: '로그인 후 이용하실 수 있습니다.',
      });
    } else if (isFollowed) {
      unSubscribe();
    } else {
      subscribe();
    }
  };

  const navigate = useNavigate();
  const onClickCompanyHandler = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/profile/company/${COMPANY[companyName]}`);
  };

  return (
    <CompanyItemWrapper>
      <CompanyWrapper onClick={onClickCompanyHandler}>
        <CompanyImg src={logoSrc} alt={companyName} />
        <CompanyName sizeType="sm" margin="0 0.2rem 0 0.3rem">
          {companyName}
        </CompanyName>
      </CompanyWrapper>
      <FollowButtonWrapper>
        <FollowButton
          designType={isFollowed ? 'blueFill' : 'skyFill'}
          fontSize="var(--fonts-body-xm)"
          onClick={onClickSubscribeHandler}
        >
          {isFollowed ? '구독중' : '구독'}
        </FollowButton>
      </FollowButtonWrapper>
    </CompanyItemWrapper>
  );
};

export default CompanyRecommendItem;
