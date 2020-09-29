import * as constants from './constants';
import { IMovieData } from '../../interfaces/IMovieData';
import { MovieActionsTypes } from './types';

export function loadingMovies(): MovieActionsTypes {
  return {
    type: constants.LOADING_MOVIES,
    loading: true,
  };
}

export function loadingMoviesSuccess(movies: IMovieData[]): MovieActionsTypes {
  return {
    type: constants.LOAD_MOVIES_SUCCESS,
    loading: false,
    movies: movies,
  };
}

export function loadingMoviesError(errorMessage: string): MovieActionsTypes {
  return {
    type: constants.LOADING_MOVIES_ERROR,
    loading: true,
    errorMessage: errorMessage,
  };
}
export function addMovie(movie: IMovieData): MovieActionsTypes {
  return {
    type: constants.ADD_MOVIE,
    movieToAdd: movie,
  };
}

export function updateMovie(movie: IMovieData): MovieActionsTypes {
  return {
    type: constants.UPDATE_MOVIE,
    movieToUpdate: movie,
  };
}

export function deleteMovie(movieId: number): MovieActionsTypes {
  return {
    type: constants.DELETE_MOVIE,
    movieId: movieId,
  };
}

export function selectMovie(movie: IMovieData): MovieActionsTypes {
  return {
    type: constants.SELECT_MOVIE,
    movie: movie,
  };
}

export function filterByReleaseDateAndRating(
  releaseDate: string,
  rating: number
): MovieActionsTypes {
  return {
    type: constants.FILTER_BY_RELEASE_DATE_AND_RATING,
    releaseDate: releaseDate,
    rating: rating,
  };
}

export function sortByGenre(genre: string): MovieActionsTypes {
  return {
    type: constants.SORT_BY_GENRE,
    genre: genre,
  };
}
