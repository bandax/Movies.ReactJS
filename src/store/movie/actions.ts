import { ACTIONS } from './constants';
import { IMovieData } from '../../interfaces/IMovieData';
import { MovieActionsTypes } from './types';

export function loadingMovies(): MovieActionsTypes {
  return {
    type: ACTIONS.LOADING_MOVIES,
    loading: true,
  };
}

export function loadingMoviesSuccess(movies: IMovieData[]): MovieActionsTypes {
  return {
    type: ACTIONS.LOAD_MOVIES_SUCCESS,
    loading: false,
    movies,
    findMovies: movies.length > 0,
  };
}

export function loadingMoviesError(errorMessage: string): MovieActionsTypes {
  return {
    type: ACTIONS.LOADING_MOVIES_ERROR,
    loading: true,
    errorMessage,
  };
}
export function addMovie(movie: IMovieData): MovieActionsTypes {
  return {
    type: ACTIONS.ADD_MOVIE,
    movieToAdd: movie,
  };
}

export function updateMovie(movie: IMovieData): MovieActionsTypes {
  return {
    type: ACTIONS.UPDATE_MOVIE,
    movieToUpdate: movie,
  };
}

export function deleteMovie(movieId: number): MovieActionsTypes {
  return {
    type: ACTIONS.DELETE_MOVIE,
    movieId,
  };
}

export function selectMovie(movie: IMovieData): MovieActionsTypes {
  return {
    type: ACTIONS.SELECT_MOVIE,
    movie,
  };
}

export function filterByReleaseDateAndRating(
  releaseDate: string,
  rating: number,
): MovieActionsTypes {
  return {
    type: ACTIONS.FILTER_BY_RELEASE_DATE_AND_RATING,
    releaseDate,
    rating,
  };
}

export function sortByGenre(genre: string): MovieActionsTypes {
  return {
    type: ACTIONS.SORT_BY_GENRE,
    genre,
  };
}
