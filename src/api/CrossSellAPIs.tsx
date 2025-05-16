import { CrossSellWidget } from '../types/CrossSell';

import axiosPrivate from './axios';

export const getCrossSellWidgets = async (
  shopId: number,
  offset: number,
  limit: number,
) => {
  const response = await axiosPrivate.get(
    `/api/cross-sell-widgets/?shop_id=${shopId}&offset=${offset}&limit=${limit}`,
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 404) {
    return Promise.reject(new Error(response.data.message));
  }

  return response.data;
};

export const createCrossSellWidget = async (
  crossSellWidget: CrossSellWidget,
) => {
  const response = await axiosPrivate.post(
    `/api/cross-sell-widgets/`,
    crossSellWidget,
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 201) {
    return response.data;
  }

  return Promise.reject(new Error(response.data.error));
};

export const editCrossSellWidget = async (crossSellWidget: CrossSellWidget) => {
  const response = await axiosPrivate.put(
    `/api/cross-sell-widgets/${crossSellWidget.id}/?shop_id=${crossSellWidget.shop}`,
    crossSellWidget,
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 200) {
    return response.data;
  }

  return Promise.reject(new Error(response.data.message));
};

export const editCrossSellWidgetStatus = async (
  crossSellWidget: CrossSellWidget,
) => {
  const response = await axiosPrivate.put(
    `/api/cross-sell-widgets/${crossSellWidget.id}/update-status/`,
    {
      shop: crossSellWidget.shop,
      status: crossSellWidget.status,
    },
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 200) {
    return response.data;
  }

  return Promise.reject(new Error(response.data.message));
};

export const deleteCrossSellWidget = async (widgetId: number) => {
  const response = await axiosPrivate.delete(
    `/api/cross-sell-widgets/${widgetId}/`,
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 204) {
    return response.data;
  }

  return Promise.reject(new Error(response.data.message));
};
