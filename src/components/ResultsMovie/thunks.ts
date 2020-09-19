// src/thunks.ts

import { Action } from "redux";
import { loadingMovies } from "../../store/movie/actions";
import { RootState } from "../../store/index";
import { ThunkAction } from "redux-thunk";

export const thunkSendMessage = (
  message: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch
) => {
  const asyncResp = await exampleAPI();
  dispatch(loadingMovies());
};

function exampleAPI() {
  return Promise.resolve("Async Chat Bot");
}
