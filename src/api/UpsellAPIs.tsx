import { UpsellWidget } from '../types/Upsell';

import axiosPrivate from './axios';

export const getUpsellWidgets = async (
  shopId: number,
  offset: number,
  limit: number,
) => {
  const response = await axiosPrivate.get(
    `/api/upsell-widgets/?shop_id=${shopId}&offset=${offset}&limit=${limit}`,
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 404) {
    return Promise.reject(new Error(response.data.message));
  }

  return response.data;
};

export const editUpsellWidget = async (upsellWidget: UpsellWidget) => {
  const response = await axiosPrivate.put(
    `/api/upsell-widgets/${upsellWidget.id}/?shop_id=${upsellWidget.shop}`,
    upsellWidget,
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 200) {
    return response.data;
  }

  return Promise.reject(new Error(response.data.message));
};

export const createUpsellWidget = async (upsellWidget: UpsellWidget) => {
  const response = await axiosPrivate.post(
    `/api/upsell-widgets/`,
    upsellWidget,
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 201) {
    return response.data;
  }

  return Promise.reject(new Error(response.data.message));
};

export const deleteUpsellWidget = async (widgetId: number) => {
  const response = await axiosPrivate.delete(
    `/api/upsell-widgets/${widgetId}/`,
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 204) {
    return response.data;
  }

  return Promise.reject(new Error(response.data.message));
};

export const checkUpsellExtension = async (shopUrl: string) => {
  const response = await axiosPrivate.get(
    `/api/upsell-widgets/extension/?shop_url=${shopUrl}`,
  );

  if (response?.status === 200 && !response?.data.app_in_use) {
    return response.data;
  }

  return Promise.reject(new Error(response.data.message));
};
