import * as React from 'react';
import './Header.scss';
import SearchSplit from '../Search/Search';
import AddMovie from '../AddMovie/AddMovie';

const Header: React.FunctionComponent = () => (
  <div className="header row">
    <SearchSplit />
    <AddMovie />
  </div>
);

export { Header };
