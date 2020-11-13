import * as React from 'react';
import SearchResults from '../components/SearchResults/SearchResults';
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

const movies: IMovieData[] = [
  {
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
  },
  {
    id: 1235,
    title: 'Avengers Infinity War II',
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
  },
];

type DispatchExts = ThunkDispatch<MovieState, void, Action>;
const middleware = [thunk];
const state: RootState = {
  movie: {
    movie: null,
    errorMessage: '',
    findMovies: true,
    loading: false,
    movies: movies,
  },
};

const mockStore = configureMockStore<RootState, DispatchExts>(middleware);

describe('<SearchResults />', () => {
  let store;

  beforeEach(() => {
    store = mockStore(state);
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
      useParams: () => ({
        searchQuery: 'Infinity',
      }),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a SearchResults Component', async () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search/Infinity']}>
          <Route path="/search/:searchQuery">
            <SearchResults />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    const fragment = asFragment();

    expect(fragment).toMatchSnapshot();
  });

  it('should render label with keyword to search', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/search/Infinity']}>
          <Route path="/search/:searchQuery">
            <SearchResults />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    const searchWord = getByText('Results for Infinity');
    screen.debug();

    expect(searchWord).toBeInTheDocument();
  });
});
