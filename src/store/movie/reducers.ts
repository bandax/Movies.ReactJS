import { MovieActionsTypes } from './types';
import { MovieState } from './state';
import * as constants from './constants';
import { IMovieData } from '../../interfaces/IMovieData';

const initialState: MovieState = {
  movies: [],
  loading: false,
  errorMessage: '',
};

export function movieReducer(
  state: MovieState = initialState,
  action: MovieActionsTypes
): MovieState {
  switch (action.type) {
    case constants.ADD_MOVIE:
      const addMovie = [...state.movies, action.movieToAdd];
      return {
        ...state,
        movies: addMovie,
      };
    case constants.UPDATE_MOVIE:
      const index = state.movies.findIndex(
        (movie) => movie.id === action.movieToUpdate.id
      );
      const updatedMovies = [...state.movies];
      updatedMovies[index] = action.movieToUpdate;
      return {
        ...state,
        movies: updatedMovies,
      };
    case constants.DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.movieId),
      };
    case constants.LOADING_MOVIES:
      return {
        ...state,
        loading: true,
      };
    case constants.LOAD_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.movies,
      };
    case constants.LOADING_MOVIES_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
      };
    case constants.SELECT_MOVIE:
      return {
        ...state,
        movie: action.movie,
      };
    case constants.FILTER_BY_RELEASE_DATE_AND_RATING:
      return {
        ...state,
        movies: state.movies.filter(
          (movie) =>
            movie.release_date === action.releaseDate &&
            action.rating === action.rating
        ),
      };
    case constants.SORT_BY_GENRE:
      return {
        ...state,
        movies: state.movies.sort(compare),
      };
    default:
      return state;
  }
}

function compare(a: IMovieData, b: IMovieData) {
  // Use toUpperCase() to ignore character casing
  const genresA = a.genres.map((genre) => genre.toUpperCase()).join(', ');
  const genresB = b.genres.map((genre) => genre.toUpperCase()).join(', ');

  if (genresA > genresB) {
    return 1;
  } else if (genresA < genresB) {
    return -1;
  }
  return 0;
}
