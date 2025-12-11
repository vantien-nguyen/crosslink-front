import { axiosInstance } from "./axios";

export const signIn = async (body: { email: string; password: string }) => {
  const result = await axiosInstance({
    url: "/api/users/auth/token/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
    responseType: "json",
    data: body,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

  return result;
};

export const loginShopify = async (params: string) => {
  const result = await axiosInstance({
    url: "/api/shopify/login/" + params,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    responseType: "json",
  })
    .then(function (response: { data: any }) {
      return response.data;
    })
    .catch(function (error: { response: { status: any } }) {
      return error.response.status;
    });

  return result;
};

export const signUp = async (body: any) => {
  const result = await axiosInstance({
    url: "/api/users/signup/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
    responseType: "json",
    data: body,
  })
    .then(function (response: any) {
      return response;
    })
    .catch(function (error: any) {
      return error;
    });

  return result;
};

export const refreshToken = async () => {
  const result = await axiosInstance
    .post("/api/users/auth/token/refresh/")
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

  return result;
};
