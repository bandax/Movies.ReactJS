import { MovieActionsTypes } from './types';
import { MovieState } from './state';
import { ACTIONS } from './constants';
import { IMovieData } from '../../interfaces/IMovieData';

const initialState: MovieState = {
  movies: [],
  loading: false,
  errorMessage: '',
  findMovies: true,
  genre: 'All',
};

export function movieReducer(
  state: MovieState = initialState,
  action: MovieActionsTypes,
): MovieState {
  switch (action.type) {
    case ACTIONS.ADD_MOVIE: {
      const addMovie = [...state.movies, action.movieToAdd];
      return {
        ...state,
        movies: addMovie,
      };
    }
    case ACTIONS.UPDATE_MOVIE: {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.movieToUpdate.id,
      );
      const updatedMovies = [...state.movies];
      updatedMovies[index] = action.movieToUpdate;
      return {
        ...state,
        movies: updatedMovies,
      };
    }
    case ACTIONS.DELETE_MOVIE: {
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.movieId),
      };
    }
    case ACTIONS.LOADING_MOVIES: {
      return {
        ...state,
        loading: true,
      };
    }
    case ACTIONS.LOAD_MOVIES_SUCCESS: {
      let moviesToReturn = action.movies;
      if (state.genre.toLowerCase() !== 'all') {
        moviesToReturn = action.movies.filter((m) =>
          m.genres
            .map((g) => g.toLowerCase())
            .includes(state.genre.toLowerCase()),
        );
      }
      return {
        ...state,
        loading: false,
        movies: moviesToReturn,
        findMovies: action.movies.length > 0,
      };
    }
    case ACTIONS.LOADING_MOVIES_ERROR: {
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
      };
    }
    case ACTIONS.SELECT_MOVIE: {
      return {
        ...state,
        loading: false,
        movie: action.movie,
      };
    }
    case ACTIONS.FILTER_BY_RELEASE_DATE_AND_RATING: {
      return {
        ...state,
        movies: state.movies.filter(
          (movie) =>
            movie.release_date === action.releaseDate &&
            action.rating === action.rating,
        ),
      };
    }
    case ACTIONS.SORT_BY_GENRE: {
      return {
        ...state,
        movies: state.movies.sort(compare),
      };
    }
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
  }
  if (genresA < genresB) {
    return -1;
  }
  return 0;
}
