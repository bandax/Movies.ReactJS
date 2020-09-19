import { combineReducers } from "redux";
import { movieReducer } from "./movie/reducers";
import { createStore } from "redux";

const rootReducer = combineReducers({
  movie: movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function configureStore() {
  const store = createStore(rootReducer, undefined);
  return store;
}
