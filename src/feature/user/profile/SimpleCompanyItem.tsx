import styled from 'styled-components';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Button, Paragraph } from '../../../components';
import isModalOpenedState from '../../../recoil/isModalOpenedState';
import { ISubscription } from '../../../interface/user';
import { postSubscribe, puttSubscribe } from '../../../apis/user/user';

const CompanyItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CompanyLogo = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const SimpleCompanyItem = ({ companyId, companyName, isSubscribe, logoSrc }: ISubscription) => {
  const [isSubscribedState, setIsSubscribedState] = useState(isSubscribe);
  const setIsModalOpened = useSetRecoilState(isModalOpenedState);

  const { mutate: subscribe } = useMutation(['post', 'subscribe', companyName], () =>
    postSubscribe(companyId)
  );
  const { mutate: unsubscribe } = useMutation(['put', 'subscribe', companyName], () =>
    puttSubscribe(companyId)
  );

  const subscribeBtnHandler = () => {
    if (isSubscribedState) {
      unsubscribe();
    } else {
      subscribe();
    }
    setIsSubscribedState(!isSubscribedState);
  };

  const navi = useNavigate();
  const infoHandler = () => {
    setIsModalOpened(false);
    navi(`/profile/company/${companyName}`);
  };

  return (
    <CompanyItemWrapper>
      <InfoWrapper onClick={infoHandler}>
        <CompanyLogo src={logoSrc} />
        <Paragraph sizeType="base">{companyName}</Paragraph>
      </InfoWrapper>

      <Button
        designType={isSubscribedState ? 'blueFill' : 'blueEmpty'}
        padding="0.15rem 0.75rem"
        fontSize="14px"
        borderRadius="var(--borders-radius-base)"
        onClick={subscribeBtnHandler}
      >
        {isSubscribedState ? '구독 중' : '구독'}
      </Button>
    </CompanyItemWrapper>
  );
};

export default SimpleCompanyItem;
