import * as React from 'react';
import './ResultsMovie.scss';
import { IMovie, IResultsMovieProps } from '../../interfaces/IResultsMovies';
import { DetailsMovie } from '../DetailsMovie/DetailsMovie';

export const ResultsMovie: React.FunctionComponent<IResultsMovieProps> 
                                                        = (props: IResultsMovieProps) => { 
    const resultsMovies = props.resultsMovies;     
    const title = props.title;
       
    return (
        <div className="list-movies">
            <div className="total-result">
                <span><b>{resultsMovies.total}</b> {title}</span> 
            </div>
            <div className="display-movie">
                {
                    resultsMovies.movies.map((movie:IMovie) => {
                        return (
                            <DetailsMovie movie={movie} />
                        )
                    })
                }
            </div>            
        </div>
        
    )
}
