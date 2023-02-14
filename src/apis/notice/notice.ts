import { authApi } from '../../utils/axios-instance';

export const putNotification = (data: Array<number>) => () => authApi.put(`/notification`, data);

export const getNotifications = () => authApi.get(`/notification`);
