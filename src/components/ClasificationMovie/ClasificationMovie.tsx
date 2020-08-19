import * as React from 'react';
import './ClasificationMovie.scss';
import { IClasification } from '../../interfaces/IClasificationMovie';

interface IClasificationMovieProps {
    clasificationTypes: IClasification[];
}

const ClasificationMovie: React.FunctionComponent<IClasificationMovieProps>
    = (props: IClasificationMovieProps) => {
        const movieTypes = props.clasificationTypes;

        return (
            <ul className="movies-types">
                {
                    movieTypes.map(({ id, name }) => {
                        return (
                            <li key={id} className="movie-type">
                                <a href="">{name}</a>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

export { ClasificationMovie };
