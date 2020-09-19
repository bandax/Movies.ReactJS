import { Action } from "redux";
import {
  loadingMovies,
  loadingMoviesSuccess,
  loadingMoviesError,
} from "../../store/movie/actions";
import { RootState } from "../../store/index";
import { ThunkDispatch } from "redux-thunk";

export const loadMovies = () => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  try {
    dispatch(loadingMovies());
    const response = await fetch("http://localhost:4000/movies");
    const movies = await response.json();
    dispatch(loadingMoviesSuccess(movies.data));
  } catch (error) {
    console.log(error);
    dispatch(loadingMoviesError(error.message));
  }
};
