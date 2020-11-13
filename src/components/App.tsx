import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from './NotFound/NotFound';
import SearchResults from './SearchResults/SearchResults';
import MovieInfo from './MovieInfo/MovieInfo';
import Movie from './Movie';

interface IAppProps {
  store: any;
}

const App: React.FunctionComponent<IAppProps> = (props) => (
  <div className="app">
    <Provider store={props.store}>
      <Switch>
        <Route exact path="/" component={Movie} />
        <Route exact path="/film/:movieId" component={MovieInfo} />
        <Route exact path="/search/:searchQuery" component={SearchResults} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Provider>
  </div>
);

export { App };
