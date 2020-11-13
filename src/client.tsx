import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { movieReducer } from './store/movie/reducers';

import { App } from './components/App';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    PRELOADED_STATE: any;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.PRELOADED_STATE;

// Allow the passed state to be garbage-collected
delete window.PRELOADED_STATE;

const rootReducer = combineReducers({
  movie: movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  preloadedState,
  compose(applyMiddleware(thunk), composeEnhancers()),
);

ReactDOM.hydrate(
  <BrowserRouter>
    <App store={store} />
  </BrowserRouter>,
  document.getElementById('root'),
);
