import * as React from 'react';
import './ClasificationMovie.scss';
import { IClasification, IClasificationMovieProps } from '../../interfaces/IClasificationMovie';

export function ClasificationMovie(props: IClasificationMovieProps) {
    const movieTypes = props.clasificationTypes;     
       
    return (
        <>
            <ul className="movies-types">
            {
                movieTypes.map((clasification: IClasification) => {
                    return(
                        <>
                            <li key={clasification.id} className="movie-type">
                                <a href="" >{clasification.name}</a>
                            </li>
                    </>)
                })
            }
            </ul>
        </>
        
    )
}
