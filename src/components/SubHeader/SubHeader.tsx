import * as React from "react";
import './SubHeader.scss';

import { ClasificationMovie } from '../ClasificationMovie/ClasificationMovie';
import { IClasificationMovieProps } from '../../interfaces/IClasificationMovie';

import { SortMovie } from '../SortMovie/SortMovie';
import { ISortMovieProps } from '../../interfaces/ISortMovie';

import * as movieTypes from '../../data/clasifications.json';
import * as sortOpts from '../../data/sorts.json';

const sortMovieProps: ISortMovieProps = {
  titleSort: "sort by",
  sortOptions: sortOpts
}

const clasificationTypesProps: IClasificationMovieProps = {
  clasificationTypes: movieTypes
}
  
export const SubHeader: React.FunctionComponent = () => (    
  <div className="sub-header">
      <div className="clasification-movies">
          <ClasificationMovie clasificationTypes={clasificationTypesProps.clasificationTypes} />   
      </div>
      <div className="sort-movies">      
          <SortMovie titleSort={sortMovieProps.titleSort} sortOptions={sortMovieProps.sortOptions} />   
      </div>
  </div>
);
