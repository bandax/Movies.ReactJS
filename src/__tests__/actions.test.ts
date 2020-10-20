import configureMockStore, { MockStoreCreator } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import * as actions from '../store/movie/actions';
import { loadMovies } from '../components/ResultsMovie/thunks';
import {
  deleteSelectedMovie,
  saveMovie,
  selectedMovie,
} from '../components/AddMovie/thunks';
import moviesData from '../data/movies.json';
import { IMovieData } from '../interfaces/IMovieData';
import { MovieState } from '../store/movie/state';
import { Action } from 'redux';
jest.mock('../services/networkService');

const newMovie: IMovieData = {
  id: 0,
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

const movieAdded: IMovieData = {
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

type DispatchExts = ThunkDispatch<MovieState, void, Action>;
const middleware = [thunk];

const mockStore = configureMockStore<MovieState, DispatchExts>(middleware);

describe('Movies actions', () => {
  let store;
  beforeEach(() => (store = mockStore()));

  it('should create an action to fetch movies', () => {
    const movies: IMovieData[] = moviesData.data;
    const actionToTest = loadMovies();

    return store.dispatch(actionToTest).then(() => {
      expect(store.getActions()).toEqual([
        actions.loadingMovies(),
        actions.loadingMoviesSuccess(movies),
      ]);
    });
  });

  it('should create an action to add new movie', () => {
    const actionToTest = saveMovie(newMovie);

    return store.dispatch(actionToTest).then(() => {
      expect(store.getActions()).toEqual([actions.addMovie(movieAdded)]);
    });
  });

  it('should create an action to update movie', () => {
    const actionToTest = saveMovie(movieToUpdate);

    return store.dispatch(actionToTest).then(() => {
      expect(store.getActions()).toEqual([actions.updateMovie(movieToUpdate)]);
    });
  });

  it('should create an action to delete existing movie', () => {
    const actionToTest = deleteSelectedMovie(1234);

    return store.dispatch(actionToTest).then(() => {
      expect(store.getActions()).toEqual([actions.deleteMovie(1234)]);
    });
  });
});
