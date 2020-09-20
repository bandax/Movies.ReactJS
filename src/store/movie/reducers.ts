import { MovieActionsTypes } from "./types";
import { MovieState } from "./state";
import * as constants from "./constants";

const initialState: MovieState = {
  movies: [],
  loading: false,
  errorMessage: "",
};

export function movieReducer(
  state: MovieState = initialState,
  action: MovieActionsTypes
): MovieState {
  switch (action.type) {
    case constants.ADD_MOVIE:
      return {
        ...state,
        movies: state.movies.concat(action.movieToAdd),
      };
    case constants.UPDATE_MOVIE:
      const index = state.movies.findIndex(
        (movie) => movie.id === action.movieToUpdate.id
      );
      const newMovies = Object.assign([], state.movies, {
        [index]: action.movieToUpdate,
      });

      return {
        ...state,
        movies: newMovies,
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
    default:
      return state;
  }
}
