import { api, authApi } from '../../utils/axios-instance';

export const getCompanyId = (companyName: string) =>
  api.get(`/company/id/${companyName}`).then((res) => res.data);

export const getCompanyDetail = (companyId: number) =>
  authApi.get(`/company/${companyId}`).then((res) => res.data);
