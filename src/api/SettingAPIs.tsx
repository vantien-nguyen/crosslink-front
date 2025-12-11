import axios from "axios";

import axiosPrivate from "./axios";

export const editLogo = async (data: {
  shopId: number;
  logoExtension: string;
}) => {
  const response = await axiosPrivate.post(
    `/api/shops/${data.shopId}/add-logo/`,
    {
      logo_extension: data.logoExtension,
    },
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 404) {
    return Promise.reject(new Error(response.data.message));
  }

  return response.data;
};

export const saveAWSLogo = async (data: any) => {
  const response = await axios({
    url: data.url,
    method: "POST",
    data: data.formData,
  });

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 404) {
    return Promise.reject(new Error(response.data.message));
  }

  return response.data;
};
