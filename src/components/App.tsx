import * as React from "react";
import './App.scss';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { ErrorBoundary } from './Error/ErrorBoundary';

import { ClasificationMovie } from './ClasificationMovie/ClasificationMovie';
import { IClasification, IClasificationMovieProps } from '../interfaces/IClasificationMovie';

import { SortMovie } from './SortMovie/SortMovie';
import { ISortOption, ISortMovieProps } from '../interfaces/ISortMovie';

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


const sortOpts: ISortOption[] = [
  {
    id: "sort-1",
    name: "RELEASE DATE"
  },
  {
    id: "sort-2",
    name: "MOST POPULAR"
  }
];

const sortMovieProps: ISortMovieProps = {
  titleSort: "SORT BY",
  sortOptions: sortOpts
}

const movieTypes: IClasification[] = 
[
  {
    id: "type-1",
    name: "ALL"
  },
  {
    id: "type-2",
    name: "DCOUMENTARY"
  },
  {
    id: "type-3",
    name: "COMEDY"
  },
  {
    id: "type-4",
    name: "HORROR"
  },
  {
    id: "type-5",
    name: "CRIME"
  },
];

const clasificationTypesProps: IClasificationMovieProps = {
 clasificationTypes: movieTypes
}

export const App = () => (
  <div className="app">  
    <ErrorBoundary>
      <Header />     
      <ClasificationMovie clasificationTypes={clasificationTypesProps.clasificationTypes} />   
      <SortMovie titleSort={sortMovieProps.titleSort} sortOptions={sortMovieProps.sortOptions} />   
      <ResultsMovie title={resultsMovieProps.title} resultsMovies={resultsMovieProps.resultsMovies} />
      <Footer />
    </ErrorBoundary>      
</div>
);
