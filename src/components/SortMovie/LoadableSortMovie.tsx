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

const SortMovieSplit: React.FunctionComponent<ISortMovieProps> = (
  props: ISortMovieProps,
) => {
  return <LoadableSortMovie sortOptions={props.sortOptions} />;
};

export default SortMovieSplit;
