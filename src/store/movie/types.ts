import { ACTIONS } from './constants';
import { IMovieData } from '../../interfaces/IMovieData';

export interface IAddMovie {
  type: ACTIONS.ADD_MOVIE;
  movieToAdd: IMovieData;
}

export interface IUpdateMovie {
  type: ACTIONS.UPDATE_MOVIE;
  movieToUpdate: IMovieData;
}

export interface IDeleteMovie {
  type: ACTIONS.DELETE_MOVIE;
  movieId: number;
}

export interface ILoadingMovies {
  type: ACTIONS.LOADING_MOVIES;
  loading: boolean;
}
export interface ILoadMoviesSuccess {
  type: ACTIONS.LOAD_MOVIES_SUCCESS;
  movies: IMovieData[];
  loading: boolean;
  findMovies: boolean;
}

export interface ILoadMoviesError {
  type: ACTIONS.LOADING_MOVIES_ERROR;
  loading: boolean;
  errorMessage: string;
}

export interface ISelectMovie {
  type: ACTIONS.SELECT_MOVIE;
  movie: IMovieData;
}

export interface IFilterReleaseDateAndRating {
  type: ACTIONS.FILTER_BY_RELEASE_DATE_AND_RATING;
  releaseDate: string;
  rating: number;
}

export interface ISortByGenre {
  type: ACTIONS.SORT_BY_GENRE;
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
