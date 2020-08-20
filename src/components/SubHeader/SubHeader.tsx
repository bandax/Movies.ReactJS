import * as React from "react";
import './SubHeader.scss';

import { ClasificationMovie } from '../ClasificationMovie/ClasificationMovie';

import { SortMovie } from '../SortMovie/SortMovie';
import * as sortOptions from '../../data/sorts.json';

import * as clasificationTypes from '../../data/clasifications.json';
  
const SubHeader: React.FunctionComponent = () => (    
  <div className="sub-header row">
      <div className="clasification-movies col-9 col-s-9">
          <ClasificationMovie clasificationTypes={clasificationTypes} />   
      </div>
      <div className="sort-movies col-3 col-s-3">      
          <SortMovie sortOptions={sortOptions} />   
      </div>
  </div>
);

 export { SubHeader };