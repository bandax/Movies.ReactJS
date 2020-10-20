import moviesData from '../../data/movies.json';
import fetchMock from 'fetch-mock';
import { IMovieData } from '../../interfaces/IMovieData';
import { INetworkData } from '../../interfaces/INetWorkData';

export const getRequest = (url: string) => {
  fetchMock.get(url, moviesData);
  const response = fetch(url);
  return response;
};

export const postRequest = (data: INetworkData) => {
  const movie: IMovieData = {
    id: 1234,
    title: 'Avengers Infinity War',
    poster_path: '../../../assets/posters/avengers-infinity-war.PNG',
    release_date: '01/02/2010',
    budget: 123,
    revenue: 123,
    vote_average: 123,
    vote_count: 123,
    runtime: 412,
    tagline: '12343',
    overview: 'tests',
    genres: ['Action & Adventure', 'Comedy'],
  };
  const { url, body, contentType } = data;
  fetchMock.post(url, movie);
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
  const movie: IMovieData = {
    id: 1234,
    title: 'Avengers Infinity War',
    poster_path: '../../../assets/posters/avengers-infinity-war.PNG',
    release_date: '01/02/2010',
    budget: 123,
    revenue: 123,
    vote_average: 123,
    vote_count: 123,
    runtime: 412,
    tagline: '12343',
    overview: 'tests',
    genres: ['Action & Adventure', 'Comedy'],
  };
  const { url, body, contentType } = data;
  fetchMock.put(url, movie);
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
  fetchMock.delete(url, 'OK');
  const response = fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'delete',
  });
  return response;
};
