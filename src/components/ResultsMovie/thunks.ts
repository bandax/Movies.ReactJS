import { Action } from 'redux';
import {
  loadingMovies,
  loadingMoviesSuccess,
  loadingMoviesError,
} from '../../store/movie/actions';
import { RootState } from '../../store/index';
import { ThunkDispatch } from 'redux-thunk';
import { getRequest } from '../../services/networkService';

export const loadMovies = () => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  try {
    dispatch(loadingMovies());
    const response = await getRequest('http://localhost:4000/movies');
    const movies = await response.json();
    dispatch(loadingMoviesSuccess(movies.data));
  } catch (error) {
    dispatch(loadingMoviesError(error.message));
  }
};
