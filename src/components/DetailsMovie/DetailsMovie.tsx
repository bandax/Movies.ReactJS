import * as React from 'react';
import './DetailsMovie.scss';
import { IMovie } from '../../interfaces/IResultsMovies';

export interface IDetailsMovieProps {
    movie: IMovie;   
}

const DetailsMovie: React.FunctionComponent<IDetailsMovieProps>
    = (props: IDetailsMovieProps) => {
        const movie = props.movie;

        return (
            <div className="details-movie col-4 col-s-6" key={movie.id}>
                <img className="poster-movie" src={movie.image} />                
                <div className="text-movie row">
                    <div className="title-movie col-8">
                        <span>{movie.title}</span>
                    </div>
                    <div className="year-movie col-4">
                        <span>{movie.year}</span>
                    </div>
                </div>
                <div className="category">
                    <span className="categories-movie">
                        { movie.categories.map(category => category.name).join(", ") }
                    </span>
                </div>
            </div>
        )
    }

export { DetailsMovie };
