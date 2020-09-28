import { combineReducers, applyMiddleware } from "redux";
import { movieReducer } from "./movie/reducers";
import { createStore } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  movie: movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
