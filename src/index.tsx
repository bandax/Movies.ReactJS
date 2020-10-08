import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { NotFound } from './components/NotFound/NotFound';
import { NoResults } from './components/NoResults/NoResults';
import MovieInfo from './components/MovieInfo/MovieInfo';
import SearchResults from './components/SearchResults/SearchResults';
import { store } from './store/index';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/film/:movieId" component={MovieInfo} />
        <Route exact path="/search/:searchQuery" component={SearchResults} />
        <Route exact path="/noresults" component={NoResults} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  </Provider>,
  rootElement
);
