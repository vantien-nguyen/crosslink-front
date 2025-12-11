import axiosPrivate from "./axios";

export const signOut = async () => {
  const response = await axiosPrivate.post(`api/users/signout/`);

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 404) {
    return Promise.reject(new Error(response.data.message));
  }

  return response.data;
};

export const updatePassword = async (password: {
  current_password: string;
  new_password: string;
}) => {
  const response = await axiosPrivate.put(
    `api/users/change-password/`,
    password,
  );

  if (response.status === 403) {
    return Promise.reject(new Error(response.data.detail));
  }

  if (response.status === 404) {
    return Promise.reject(new Error(response.data.message));
  }

  if (response.status === 400) {
    return Promise.reject(new Error(response.data.message));
  }

  return response.data;
};
