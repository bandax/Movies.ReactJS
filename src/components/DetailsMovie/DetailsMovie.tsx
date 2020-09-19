import * as React from "react";
import "./DetailsMovie.scss";
import { IMovieData } from "../../interfaces/IMovieData";

export interface IDetailsMovieProps {
  movie: IMovieData;
}

const DetailsMovie: React.FunctionComponent<IDetailsMovieProps> = (
  props: IDetailsMovieProps
) => {
  const movie = props.movie;

  const getYear = function (releaseDate: string) {
    const date = new Date(releaseDate);
    return date.getFullYear();
  };

  return (
    <div className="details-movie" key={movie.id}>
      <img className="poster-movie" src={movie.poster_path} />
      <br />
      <span className="title-movie">{movie.title}</span>
      <span className="year-movie">{getYear(movie.release_date)}</span>
      <span className="categories-movie">
        {movie.genres.map((category) => category).join(", ")}
      </span>
    </div>
  );
};

export { DetailsMovie };
