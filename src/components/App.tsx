import * as React from "react";
import './App.scss';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { ErrorBoundary } from './Error/ErrorBoundary';
import { SubHeader } from './SubHeader/SubHeader';

import { ResultsMovie } from './ResultsMovie/ResultsMovie';
import { IMovie, IResultsMovie, IResultsMovieProps } from '../interfaces/IResultsMovies';

const movies: IMovie[] = [
  {
    id:"movie-1",
    title: "Avengers Infinity War",
    image: "../../../assets/posters/avengers-infinity-war.PNG",
    year: 2004,
    categories: [
      {
        id: "cat-1",
        name: "Action & Adventure"
      }
    ]
  },
  {
    id:"movie-2",
    title: "Pulp Fiction",
    image: "../../../assets/posters/pulp-fiction.PNG",
    year: 2004,
    categories: [
      {
        id: "cat-1",
        name: "Action & Adventure"
      },
      {
        id: "cat-2",
        name: "Drama"
      }
    ]
  }
];

const resultMovies: IResultsMovie = {
  total: 2,
  movies: movies
}

const resultsMovieProps: IResultsMovieProps = {
  title: "movies found",
  resultsMovies: resultMovies
}

export const App: React.FunctionComponent = () => (    
  <div className="app">  
    <ErrorBoundary>
      <Header />     
      <SubHeader />
      <ResultsMovie title={resultsMovieProps.title} resultsMovies={resultsMovieProps.resultsMovies} />
      <Footer />
    </ErrorBoundary>      
  </div>
);
