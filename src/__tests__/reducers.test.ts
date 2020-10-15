import { movieReducer } from '../store/movie/reducers';
import moviesData from '../data/movies.json';
import { IMovieData } from '../interfaces/IMovieData';
import {
  loadingMovies,
  loadingMoviesSuccess,
  loadingMoviesError,
} from '../store/movie/actions';
import { MovieState } from '../store/movie/state';

describe('moviesReducer', () => {
  it('should set isLoading to true when fetching movies loading started', () => {
    const state: MovieState = {
      movies: [],
      loading: false,
      errorMessage: '',
      findMovies: true,
    };

    const isLoading = movieReducer(state, loadingMovies()).loading;

    expect(isLoading).toBe(true);
  });

  it('should return list of movies and set isLoading to false', () => {
    const state: MovieState = {
      movies: [],
      loading: false,
      errorMessage: '',
      findMovies: true,
    };
    const movies: IMovieData[] = moviesData.data;

    const newState = movieReducer(state, loadingMoviesSuccess(movies));

    expect(newState.loading).toBe(false);
    expect(newState.movies).toBe(movies);
  });

  it('should return error and set isLoading to false', () => {
    const state: MovieState = {
      movies: [],
      loading: false,
      errorMessage: '',
      findMovies: true,
    };
    const errorMessage = 'No data found';

    const newState = movieReducer(state, loadingMoviesError(errorMessage));

    expect(newState.loading).toBe(false);
    expect(newState.errorMessage).toBe(errorMessage);
  });
});
