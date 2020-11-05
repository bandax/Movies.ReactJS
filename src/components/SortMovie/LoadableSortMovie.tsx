import * as React from 'react';
import Loadable from 'react-loadable';
import Loading from '../Loading/Loading';
import { ISortOption } from '../../interfaces/ISortMovie';

const LoadableSortMovie = Loadable({
  loader: () => import('./SortMovie'),
  loading: Loading,
});

interface ISortMovieProps {
  sortOptions: ISortOption[];
}

export default class SortMovieSplit extends React.Component<ISortMovieProps> {
  constructor(props) {
    super(props);
  }
  render() {
    return <LoadableSortMovie sortOptions={this.props.sortOptions} />;
  }
}
