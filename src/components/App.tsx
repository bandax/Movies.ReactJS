import * as React from 'react';
import './App.scss';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { ErrorBoundary } from './Error/ErrorBoundary';
import { SubHeader } from './SubHeader/SubHeader';

import { ResultsMovie } from './ResultsMovie/ResultsMovie';
import { IMovie, IResultsMovieProps } from '../interfaces/IResultsMovies';
import * as movies from '../data/movies.json';

const resultsMovieProps: IResultsMovieProps = {  
  resultsMovies: movies
}

export const App: React.FunctionComponent = () => (    
  <div className="app">  
    <ErrorBoundary>
      <Header />     
      <SubHeader />
      <ResultsMovie resultsMovies={resultsMovieProps.resultsMovies} />
      <Footer />
    </ErrorBoundary>      
  </div>
);
