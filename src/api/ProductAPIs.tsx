import axiosPrivate from "./axios";

export const getProducts = async (
  shopId: number,
  offset: number,
  limit: number,
  searchText: string,
) => {
  const response = await axiosPrivate.get(
    `/api/products/?shop_id=${shopId}&offset=${offset}&limit=${limit}&search=${searchText}`,
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 404) {
    return Promise.reject(new Error(response.data.message));
  }

  return response.data;
};
