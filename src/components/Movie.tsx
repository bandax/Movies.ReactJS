import * as React from 'react';
//import './App.scss';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { ErrorBoundary } from './Error/ErrorBoundary';
import { SubHeader } from './SubHeader/SubHeader';
import ResultsMovie from './ResultsMovie/ResultsMovie';

const Movie: React.FunctionComponent = () => (
  <div className="app">
    <ErrorBoundary>
      <Header />
      <SubHeader />
      <ResultsMovie />
      <Footer />
    </ErrorBoundary>
  </div>
);

export { Movie };
