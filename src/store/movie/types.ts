import * as constants from "./constants";
import { IMovie } from "../../interfaces/IResultsMovies";

export interface IAddMovie {
  type: constants.ADD_MOVIE;
  movieToAdd: IMovie;
}

export interface IUpdateMovie {
  type: constants.UPDATE_MOVIE;
  movieToUpdate: IMovie;
}

export interface IDeleteMovie {
  type: constants.DELETE_MOVIE;
  movieId: number;
}

export interface ILoadingMovies {
  type: constants.LOADING_MOVIES;
  loading: boolean;
}
export interface ILoadMoviesSuccess {
  type: constants.LOAD_MOVIES_SUCCESS;
  movies: IMovie[];
  loading: boolean;
}

export interface ILoadMoviesError {
  type: constants.LOADING_MOVIES_ERROR;
  loading: boolean;
  errorMessage: string;
}

export type MovieActionsTypes =
  | IAddMovie
  | IUpdateMovie
  | IDeleteMovie
  | ILoadingMovies
  | ILoadMoviesSuccess
  | ILoadMoviesError;
