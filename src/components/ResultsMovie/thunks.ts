// src/thunks.ts

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
  console.log("laoding movies");

  try {
    dispatch(loadingMovies());
    const response = await fetch("http://localhost:4000/movies");
    const movies = await response.json();
    console.log(movies);
    dispatch(loadingMoviesSuccess(movies.data));
  } catch (error) {
    console.log(error);
    dispatch(loadingMoviesError(error.message));
    // dispatch(displayAlert(error));
  }
};
