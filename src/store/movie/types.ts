import * as constants from './constants';
import { IMovieData } from '../../interfaces/IMovieData';

export interface IAddMovie {
  type: constants.ADD_MOVIE;
  movieToAdd: IMovieData;
}

export interface IUpdateMovie {
  type: constants.UPDATE_MOVIE;
  movieToUpdate: IMovieData;
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
  movies: IMovieData[];
  loading: boolean;
}

export interface ILoadMoviesError {
  type: constants.LOADING_MOVIES_ERROR;
  loading: boolean;
  errorMessage: string;
}

export interface ISelectMovie {
  type: constants.SELECT_MOVIE;
  movie: IMovieData;
}

export interface IFilterReleaseDateAndRating {
  type: constants.FILTER_BY_RELEASE_DATE_AND_RATING;
  releaseDate: string;
  rating: number;
}

export interface ISortByGenre {
  type: constants.SORT_BY_GENRE;
  genre: string;
}

export type MovieActionsTypes =
  | IAddMovie
  | IUpdateMovie
  | IDeleteMovie
  | ILoadingMovies
  | ILoadMoviesSuccess
  | ILoadMoviesError
  | ISelectMovie
  | IFilterReleaseDateAndRating
  | ISortByGenre;
