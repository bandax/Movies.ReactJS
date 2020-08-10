import * as React from 'react';
import './DetailsMovie.scss';
import { ICategory, IDetailsMovieProps } from '../../interfaces/IResultsMovies';



export function DetailsMovie(props: IDetailsMovieProps) {
    const movie = props.movie;     
       
    return (
        <div className="details-movie" key={movie.id}>
            <img className="poster-movie" src={movie.image} />
            <br />
            <span className="title-movie">{movie.title}</span>                       
            <span className="year-movie">{movie.year}</span>
            <span className="categories-movie">
                {
                    movie.categories.map((category:ICategory) => {
                        return category.name
                    }).join(", ")
                }
            </span>
        </div>
        
    )
}
