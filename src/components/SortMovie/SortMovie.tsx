import * as React from 'react';
import './SortMovie.scss';
import { ISortOption } from '../../interfaces/ISortMovie';

interface ISortMovieProps {
  sortOptions: ISortOption[];
}

const SortMovie: React.FunctionComponent<ISortMovieProps> = (
  props: ISortMovieProps
) => {
  const { sortOptions } = props;

  return (
    <>
      <span className="sort-title">sort by: </span>
      <select>
        {sortOptions.map((sortOption: ISortOption) => (
          <option key={sortOption.id} value={sortOption.id}>
            {sortOption.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SortMovie;
