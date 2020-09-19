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
      const movies = state.movies.filter(
        (movie) => movie.id !== action.movieToUpdate.id
      );
      return {
        ...state,
        movies: movies.concat(action.movieToUpdate),
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
    default:
      return state;
  }
}
