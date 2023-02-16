import { authApi } from '../../utils/axios-instance';

export const getNotifications = () => authApi.get(`/notification`);
