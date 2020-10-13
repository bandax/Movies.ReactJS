import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import * as actions from '../store/movie/actions';
import { loadMovies } from '../components/ResultsMovie/thunks';
import moviesData from '../data/movies.json';
import { IMovieData } from '../interfaces/IMovieData';
import { MovieState } from '../store/movie/state';
import { Action } from 'redux';

/**
 * 
 * import { AnyAction } from 'redux'; // Or your own Action definition
import createMockStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { ApplicationState } from '../your/definitions';

type DispatchExts = ThunkDispatch<ApplicationState, void, AnyAction>;

const middleware = [thunk];
const mockStore = createMockStore<ApplicationState, DispatchExts>(middleware);

const store = mockStore();
 */

type DispatchExts = ThunkDispatch<MovieState, void, Action>;
const middleware = [thunk];

const mockStore = configureMockStore<MovieState, DispatchExts>(middleware);

describe('async', () => {
  let store;

  beforeEach(() => (store = mockStore()));

  afterEach(fetchMock.restore);

  it('should create an action to fetch posts', () => {
    const movies: IMovieData[] = moviesData;

    fetchMock.get('http://localhost:4000/movies', movies);

    return store.dispatch(loadMovies()).then(() => {
      expect(fetchMock.called('http://localhost:4000/movies')).toBe(true);
      expect(store.getActions()).toEqual([
        actions.loadingMovies(),
        actions.loadingMoviesSuccess(movies),
      ]);
    });
  });
});
