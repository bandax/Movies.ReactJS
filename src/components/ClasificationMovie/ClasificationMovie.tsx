import * as React from 'react';
import './ClasificationMovie.scss';
import { IClasification, IClasificationMovieProps } from '../../interfaces/IClasificationMovie';

export const ClasificationMovie: React.FunctionComponent<IClasificationMovieProps>
    = (props: IClasificationMovieProps) => {
        const movieTypes = props.clasificationTypes;

        return (
            <ul className="movies-types">
                {
                    movieTypes.map(({ id, name }) => {
                        return (
                            <li key={id} className="movie-type">
                                <a href="" >{name}</a>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
