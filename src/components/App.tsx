import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { combineReducers, applyMiddleware } from 'redux';
import { movieReducer } from '../store/movie/reducers';
import { createStore } from 'redux';
import { Movie } from './Movie';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __PRELOADED_STATE__: any;
  }
}

const rootReducer = combineReducers({
  movie: movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// export const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );

interface IAppProps {
  store: any;
}

const App: React.FunctionComponent<IAppProps> = (props) => (
  <div className="app">
    <Provider store={props.store}>
        <Switch>
          <Route exact path="/" component={Movie} />
          {/* <Route exact path="/film/:movieId" component={MovieInfo} />
        <Route exact path="/search/:searchQuery" component={SearchResults} />
        <Route path="*" component={NotFound} /> */}
        </Switch>
    </Provider>
  </div>
);

export { App };
