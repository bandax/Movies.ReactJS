import * as React from 'react';
import { Link } from 'react-router-dom';
import { IMovieData } from '../../interfaces/IMovieData';

export interface IDetailsMovieProps {
  movie: IMovieData;
  onEditMovie?: (movie: IMovieData) => void;
  onDeleteMovie?: (movie: IMovieData) => void;
}

// PATTERN: Reusable Component
const DetailsMovie: React.FunctionComponent<IDetailsMovieProps> = (props) => {
  const getYear = function getYearFunc(releaseDate: string) {
    const date = new Date(releaseDate);
    return date.getFullYear();
  };

  const { movie } = props;

  const onEditMovie = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onEditMovie(movie);
  };

  const onDeleteMovie = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onDeleteMovie(movie);
  };

  return (
    <>
      <div className="details-movie" key={movie.id}>
        <img
          className="poster-movie"
          src={movie.poster_path}
          alt={movie.title}
        />
        <br />
        <span className="title-movie">{movie.title}</span>
        <span className="year-movie">{getYear(movie.release_date)}</span>
        <span className="categories-movie">
          {movie.genres.map((category) => category).join(', ')}
        </span>
        <button className="btn" type="button" onClick={onEditMovie}>
          Edit Movie
        </button>
        <button className="btn" type="button" onClick={onDeleteMovie}>
          Delete Movie
        </button>
        <Link to={`/film/${movie.id}`}>Show Details Movie</Link>
      </div>
    </>
  );
};

export { DetailsMovie };
