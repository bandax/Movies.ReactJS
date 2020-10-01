import { INetworkData } from '../interfaces/INetWorkData';

export const postRequest = (data: INetworkData) => {
  const { url, body, contentType } = data;
  const response = fetch(url, {
    headers: {
      'Content-Type': contentType,
    },
    method: 'post',
    body,
  });

  return response;
};

export const putRequest = (data: INetworkData) => {
  const { url, body, contentType } = data;
  const response = fetch(url, {
    headers: {
      'Content-Type': contentType,
    },
    method: 'put',
    body,
  });

  return response;
};

export const deleteRequest = (url: string) => {
  const response = fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'delete',
  });
  return response;
};

export const getRequest = (url: string) => {
  const response = fetch(url);
  return response;
};
