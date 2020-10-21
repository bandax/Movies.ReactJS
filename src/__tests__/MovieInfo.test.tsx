import * as React from 'react';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import thunk, { ThunkDispatch } from 'redux-thunk';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import clasificationTypes from '../data/clasifications.json';
import { IMovieData } from '../interfaces/IMovieData';
import {
  HashRouter as Router,
  Route,
  Switch,
  MemoryRouter,
} from 'react-router-dom';

import configureMockStore, { MockStoreCreator } from 'redux-mock-store';
import { MovieState } from '../store/movie/state';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { RootState } from '../store/index';

const movie: IMovieData = {
  id: 1234,
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

type DispatchExts = ThunkDispatch<MovieState, void, Action>;
const middleware = [thunk];
const state: RootState = {
  movie: {
    movie: movie,
    errorMessage: '',
    findMovies: true,
    loading: false,
    movies: [],
  },
};

const mockStore = configureMockStore<RootState, DispatchExts>(middleware);

describe('<MovieInfo />', () => {
  let onAddMovieSubmit;
  let onShowAddMovieWindow;

  let store;

  beforeEach(() => {
    store = mockStore(state);
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
      useParams: () => ({
        movieId: 1234,
      }),
    }));
  });

  //   beforeEach(() => {
  //     onAddMovieSubmit = jest.fn();
  //     onShowAddMovieWindow = jest.fn();
  //   });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a MovieInfo Component', async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/film/1234']}>
          <Route path="/film/:movieId">
            <MovieInfo />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    const fragment = asFragment();

    expect(fragment).toMatchSnapshot();
  });

  it('should render movie data', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/film/1234']}>
          <Route path="/film/:movieId">
            <MovieInfo />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    const title = getByTestId('movie-title');
    screen.debug();

    expect(title).toBeInTheDocument();
  });
});
