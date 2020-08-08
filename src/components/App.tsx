import * as React from "react";
import './App.scss';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { ErrorBoundary } from './Error/ErrorBoundary';

import { ClasificationMovie } from './ClasificationMovie/ClasificationMovie';
import { IClasification, IClasificationMovieProps } from '../interfaces/IClasificationMovie';

import { SortMovie } from './SortMovie/SortMovie';
import { ISortOption, ISortMovieProps } from '../interfaces/ISortMovie';


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
      <Footer />
    </ErrorBoundary>      
</div>
);
