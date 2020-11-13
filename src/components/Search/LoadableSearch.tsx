import * as React from 'react';
import Loadable from 'react-loadable';
import Loading from '../Loading/Loading';

const LoadableSearch = Loadable({
  loader: () => import('./Search'),
  loading: Loading,
});

const SearchSplit: React.FunctionComponent = () => {
  return <LoadableSearch />;
};

export default SearchSplit;
