import { authApi } from '../../utils/axios-instance';

const res = await authApi.get(`/notification`);
