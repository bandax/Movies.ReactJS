import * as React from 'react';
import './ResultsMovie.scss';
import { IMovie } from '../../interfaces/IResultsMovies';
import { DetailsMovie } from '../DetailsMovie/DetailsMovie';

interface IResultsMovieProps {    
    resultsMovies: IMovie[];    
}

const ResultsMovie: React.FunctionComponent<IResultsMovieProps> 
                                                        = (props: IResultsMovieProps) => { 
    const resultsMovies = props.resultsMovies;         
       
    return (
        <div className="list-movies">
            <div className="total-result">
                <span className="found-label"><b>{resultsMovies.length}</b> movies found</span> 
            </div>
            <div className="display-movie">
                { resultsMovies.map((movie:IMovie) => <DetailsMovie movie={movie} />) }
            </div>            
        </div>
        
    )
}

export { ResultsMovie };
