import * as React from 'react';
import Loadable from 'react-loadable';
import Loading from '../Loading/Loading';

const LoadableSearch = Loadable({
  loader: () => import('./Search'),
  loading: Loading,
});

export default class SearchSplit extends React.Component {
  render() {
    return <LoadableSearch />;
  }
}
