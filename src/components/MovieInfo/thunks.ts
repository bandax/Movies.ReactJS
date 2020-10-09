import { Action } from 'redux';
import {
  loadingMovies,
  loadingMoviesSuccess,
  loadingMoviesError,
  selectMovie,
} from '../../store/movie/actions';
import { RootState } from '../../store/index';
import { ThunkDispatch } from 'redux-thunk';
import { getRequest } from '../../services/networkService';
import { IMovieData } from '../../interfaces/IMovieData';

export const getMovieById = (id: string) => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  try {
    dispatch(loadingMovies());
    const response = await getRequest(`http://localhost:4000/movies/${id}`);
    const movie: IMovieData = await response.json();
    dispatch(selectMovie(movie));
  } catch (error) {
    dispatch(loadingMoviesError(error.message));
  }
};
