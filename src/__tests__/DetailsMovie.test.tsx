import * as React from 'react';
import { DetailsMovie } from '../components/DetailsMovie/DetailsMovie';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore, { MockStoreCreator } from 'redux-mock-store';
import { MovieState } from '../store/movie/state';
import { Action } from 'redux';
import { RootState } from '../store/index';
import clasificationTypes from '../data/clasifications.json';
import { IMovieData } from '../interfaces/IMovieData';

type DispatchExts = ThunkDispatch<MovieState, void, Action>;
const middleware = [thunk];
const state: RootState = {
  movie: {
    movie: null,
    errorMessage: '',
    findMovies: true,
    loading: false,
    movies: [],
  },
};

const movie: IMovieData = {
  id: 0,
  title: 'Avengers Infinity War',
  poster_path:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Scarymovie4-logo.svg/1920px-Scarymovie4-logo.svg.png',
  release_date: new Date().toLocaleDateString(),
  budget: 123,
  revenue: 123,
  vote_average: 123,
  vote_count: 123,
  runtime: 412,
  tagline: '12343',
  overview: 'tests',
  genres: ['Action & Adventure', 'Comedy'],
};

describe('<AddMovie />', () => {
  let onEditMovie;
  let onDeleteMovie;

  beforeEach(() => {
    onEditMovie = jest.fn();
    onDeleteMovie = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a Details Movie Component', async () => {
    const { asFragment } = render(
      <DetailsMovie
        movie={movie}
        onEditMovie={onEditMovie}
        onDeleteMovie={onDeleteMovie}
      />,
    );

    const fragment = asFragment();

    expect(fragment).toMatchSnapshot();
  });

  it('should allow to call edit button', async () => {
    const { getByTestId, getByText } = render(
      <DetailsMovie
        movie={movie}
        onEditMovie={onEditMovie}
        onDeleteMovie={onDeleteMovie}
      />,
    );
    const button = getByText('Edit Movie');

    userEvent.click(button);

    await waitFor(() => {
      expect(onEditMovie).toHaveBeenCalled();
    });
  });

  it('should allow to call delete movie button', async () => {
    const { getByTestId, getByText } = render(
      <DetailsMovie
        movie={movie}
        onEditMovie={onEditMovie}
        onDeleteMovie={onDeleteMovie}
      />,
    );
    const button = getByText('Delete Movie');

    userEvent.click(button);

    await waitFor(() => {
      expect(onDeleteMovie).toHaveBeenCalled();
    });
  });
});
