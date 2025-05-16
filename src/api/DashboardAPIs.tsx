import { formatDate } from '../utils';

import axiosPrivate from './axios';

export const getShopActivities = async (
  shopId: number,
  timeRangePicker: {
    startDate: Date;
    endDate: Date;
  },
) => {
  const response = await axiosPrivate.get(
    `/api/dashboard/?shop_id=${shopId}&start_date=${formatDate(timeRangePicker.startDate)}&end_date=${formatDate(timeRangePicker.endDate)}`,
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 404) {
    return Promise.reject(new Error(response.data.message));
  }

  return response.data;
};
