import * as React from 'react';
import './SortMovie.scss';
import { ISortOption, ISortMovieProps } from '../../interfaces/ISortMovie';

export function SortMovie(props: ISortMovieProps) {
    const titleFilter = props.titleSort;
    const sortOptions = props.sortOptions;
    return (
        <>
            <span className="sort-title">{titleFilter}</span>
            <select>
            {               
                sortOptions.map((sortOption:ISortOption) => {
                    return(
                        <>
                            <option key={sortOption.id} value={sortOption.id}>{sortOption.name}</option>
                        </>
                    );
                })                                            
            }
            </select>
        </>
    )
}

