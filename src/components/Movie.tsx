import * as React from 'react';
import './App.scss';
import { Header } from './Header/Header';
import { ErrorBoundary } from './Error/ErrorBoundary';
import { SubHeader } from './SubHeader/SubHeader';
import ResultsMovie from './ResultsMovie/ResultsMovie';
import FooterSplit from './Footer/LoadableFooter';

// PATTERN: Composition
const Movie: React.FunctionComponent = () => (
  <div className="app">
    <ErrorBoundary>
      <Header />
      <SubHeader />
      <ResultsMovie />
      <FooterSplit />
    </ErrorBoundary>
  </div>
);

export default Movie;
