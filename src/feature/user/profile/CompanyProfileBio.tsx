import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getCompanyDetail, getCompanyId } from '../../../apis/profile/companyProfile';
import { ICompany } from '../../../interface/user';

const BioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CompanyProfileBio = () => {
  const { companyName } = useParams();
  const { data: companyId } = useQuery<number>(['companyId'], () => getCompanyId(companyName!));

  // const { data: company } = useQuery<ICompany>(
  //   ['companyDetail'],
  //   () => getCompanyDetail(companyId!),
  //   {
  //     enabled: !!companyId,
  //   }
  // );
  // const { companyId, companyName, companyLogo, isSubscribed, subscriptionCount, companyFeed } = company

  return (
    <BioWrapper>
      <p>컴퍼니 아이디 : {companyId}</p>;
    </BioWrapper>
  );
};

export default CompanyProfileBio;
