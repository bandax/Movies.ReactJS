import { INetworkData } from "../interfaces/INetWorkData";

export const postRequest = async (data: INetworkData) => {
  const { url, body, contentType } = data;
  const response = await fetch(url, {
    headers: {
      "Content-Type": contentType,
    },
    method: "post",
    body,
  });

  return response;
};

export const putRequest = async (data: INetworkData) => {
  const { url, body, contentType } = data;
  const response = await fetch(url, {
    headers: {
      "Content-Type": contentType,
    },
    method: "put",
    body,
  });

  return response;
};

export const deleteRequest = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "delete",
  });
  return response;
};

export const getRequest = async (url: string) => {
  const response = await fetch(url);
  return response;
};
