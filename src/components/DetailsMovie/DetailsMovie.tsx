import * as React from "react";
import "./DetailsMovie.scss";
import { IMovieData } from "../../interfaces/IMovieData";

export interface IDetailsMovieProps {
  movie: IMovieData;
  onHandleEditMovie: (movie: IMovieData) => void;
  onHandleDeleteMovie: (movie: IMovieData) => void;
}

const DetailsMovie: React.FunctionComponent<IDetailsMovieProps> = (props) => {
  const getYear = function (releaseDate: string) {
    const date = new Date(releaseDate);
    return date.getFullYear();
  };

  const movie = props.movie;

  const onHandleEditMovie = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onHandleEditMovie(movie);
  };

  const onHandleDeleteMovie = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.onHandleDeleteMovie(movie);
  };

  return (
    <>
      <div className="details-movie" key={movie.id}>
        <img className="poster-movie" src={movie.poster_path} />
        <br />
        <span className="title-movie">{movie.title}</span>
        <span className="year-movie">{getYear(movie.release_date)}</span>
        <span className="categories-movie">
          {movie.genres.map((category) => category).join(", ")}
        </span>
        <button className="" onClick={onHandleEditMovie}>
          Edit Movie
        </button>
        <button className="" onClick={onHandleDeleteMovie}>
          Delete Movie
        </button>
      </div>
    </>
  );
};

export { DetailsMovie };
