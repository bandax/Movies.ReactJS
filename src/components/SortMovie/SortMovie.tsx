import * as React from 'react';
import './SortMovie.scss';
import { ISortOption, ISortMovieProps } from '../../interfaces/ISortMovie';

export function SortMovie(props: ISortMovieProps) {        
    const { titleSort, sortOptions } = props;

    return (
        <>
            <span className="sort-title">{titleSort}: </span>
            <select>
            {               
                sortOptions.map((sortOption:ISortOption) => {
                    return(                        
                        <option key={sortOption.id} value={sortOption.id}>{sortOption.name}</option>                        
                    );
                })                                            
            }
            </select>
        </>
    )
}

