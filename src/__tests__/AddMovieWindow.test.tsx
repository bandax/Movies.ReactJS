import * as React from 'react';
import { AddMovieWindow } from '../components/AddMovieWindow/AddMovieWindow';
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

const newMovie: IMovieData = {
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

const movieToUpdate: IMovieData = {
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

const mockStore = configureMockStore<RootState, DispatchExts>(middleware);

describe('<AddMovie />', () => {
  let onAddMovieSubmit;
  let onShowAddMovieWindow;

  beforeEach(() => {
    onAddMovieSubmit = jest.fn();
    onShowAddMovieWindow = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a Add Movie Window Component', async () => {
    const { asFragment } = render(
      <AddMovieWindow
        clasificationMovies={clasificationTypes}
        onAddMovieSubmit={onAddMovieSubmit}
        onShowAddMovieWindow={onShowAddMovieWindow}
        showModal={true}
        movie={newMovie}
      />
    );

    const fragment = asFragment();

    expect(fragment).toMatchSnapshot();
  });

  it('should not render the component at all', async () => {
    const { container } = render(
      <AddMovieWindow
        clasificationMovies={clasificationTypes}
        onAddMovieSubmit={onAddMovieSubmit}
        onShowAddMovieWindow={onShowAddMovieWindow}
        showModal={false}
        movie={newMovie}
      />
    );

    const elements = container.firstChild;

    expect(elements).toBeNull();
  });

  it('should close add movie window when click close icon', async () => {
    const { getByTestId, getByText } = render(
      <AddMovieWindow
        clasificationMovies={clasificationTypes}
        onAddMovieSubmit={onAddMovieSubmit}
        onShowAddMovieWindow={onShowAddMovieWindow}
        showModal={true}
        movie={newMovie}
      />
    );
    const button = getByTestId('add-movie-close');

    userEvent.click(button);

    expect(getByText('Add movie window')).toBeInTheDocument();
    await waitFor(() => {
      expect(onShowAddMovieWindow).toHaveBeenCalled();
    });
  });

  it('should show moveId input control', async () => {
    const { getByTestId, getByText } = render(
      <AddMovieWindow
        clasificationMovies={clasificationTypes}
        onAddMovieSubmit={onAddMovieSubmit}
        onShowAddMovieWindow={onShowAddMovieWindow}
        showModal={true}
        movie={movieToUpdate}
      />
    );

    const input = getByText('Movie Id');

    expect(input).toBeInTheDocument();
  });

  it('should allow to call submit button', async () => {
    const { getByTestId, getByText } = render(
      <AddMovieWindow
        clasificationMovies={clasificationTypes}
        onAddMovieSubmit={onAddMovieSubmit}
        onShowAddMovieWindow={onShowAddMovieWindow}
        showModal={true}
        movie={newMovie}
      />
    );
    const button = getByText('Submit');

    userEvent.click(button);

    await waitFor(() => {
      expect(onAddMovieSubmit).toHaveBeenCalledWith(newMovie);
    });
  });

  it('should allow to call reset button and clean up values', async () => {
    const { getByText } = render(
      <AddMovieWindow
        clasificationMovies={clasificationTypes}
        onAddMovieSubmit={onAddMovieSubmit}
        onShowAddMovieWindow={onShowAddMovieWindow}
        showModal={true}
        movie={null}
      />
    );
    const title = getByText('Title');
    const button = getByText('Reset');

    userEvent.type(title, 'New Movie');
    userEvent.click(button);

    expect(title).not.toHaveValue();
  });
});
