import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import {HashRouter} from 'react-router-dom';

import { combineReducers, applyMiddleware } from 'redux';
import { movieReducer } from './store/movie/reducers';
import { createStore } from 'redux';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __PRELOADED_STATE__: any;
  }
}

window.__PRELOADED_STATE__ = window.__PRELOADED_STATE__;

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;

console.log(preloadedState);

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

console.log('preloadState');
console.log(preloadedState);

const rootReducer = combineReducers({
  movie: movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk)
);

ReactDOM.hydrate(
   <App store={store} />,
  document.getElementById('root')
);

