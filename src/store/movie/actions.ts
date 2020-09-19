import * as constants from "./constants";
import { IMovie } from "../../interfaces/IResultsMovies";
import { MovieActionsTypes } from "./types";

export function loadingMovies(): MovieActionsTypes {
  return {
    type: constants.LOADING_MOVIES,
    loading: true,
  };
}

export function loadingMoviesSuccess(movies: IMovie[]): MovieActionsTypes {
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
export function addMovie(movie: IMovie): MovieActionsTypes {
  return {
    type: constants.ADD_MOVIE,
    movieToAdd: movie,
  };
}

export function updateMovie(movie: IMovie): MovieActionsTypes {
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
