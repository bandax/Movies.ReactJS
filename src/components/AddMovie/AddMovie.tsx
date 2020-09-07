import * as React from "react";
import "./AddMovie.scss";
import { AddMovieWindow } from "../AddMovieWindow/AddMovieWindow";
import { DeleteMovieWindow } from "../DeleteMovie/DeleteMovie";
import { MovieInfo } from "../MovieInfo/MovieInfo";
import clasificationTypes from "../../data/clasifications.json";
import { IMovie } from "../../interfaces/IResultsMovies";

const movie: IMovie = {
  id: "movie-1",
  title: "Avengers Infinity War",
  image: "../../../assets/posters/avengers-infinity-war.PNG",
  year: 2004,
  rate: 4.3,
  releaseDate: "01/02/2014",
  review:
    "The most definitive overarching issue with the Marvel Cinematic Universe has been the lack of stakes. Over the course of the saga’s previous 18 movies, MCU heroes have faced numerous world-ending threats, eking out victories by the skin of their teeth, only to have their worlds essentially return to normal in time for the next installment. The approach worked early, on a film-by-film basis, but when viewed as part of a 10-year narrative, it’s tended to weaken the broader franchise. There can be no drama without true risk, and in the MCU, audiences have learned that none of their favorites are ever really in harm’s way.",
  url: "http://movie.com",
  runtime: "154 mins",
  categories: [
    {
      id: "cat-1",
      name: "Action & Adventure",
    },
  ],
};

interface IAddMovieState {
  showAddMovieModal: boolean;
  showDeleteMovieModal: boolean;
  showMovieInfoMovieModal: boolean;
  title: string;
  releaseDate: Date;
  overview: string;
  url: string;
  genre: string;
  runtime: string;
}

const AddMovie: React.FunctionComponent = (props) => {
  const [showAddMovieModal, setShowAddMovieModal] = React.useState<boolean>(
    true
  );
  const [showDeleteMovieModal, setShowDeleteMovieModal] = React.useState<
    boolean
  >(false);
  const [showMovieInfoMovieModal, setShowMovieInfoModal] = React.useState<
    boolean
  >(false);

  const handleShowAddMovieWindow = () => {
    setShowAddMovieModal(!showAddMovieModal);
  };

  const handleShowDeleteMovieWindow = () => {
    setShowDeleteMovieModal(!showDeleteMovieModal);
  };

  const handleShowHideMovieInfoWindow = () => {
    setShowMovieInfoModal(!showMovieInfoMovieModal);
  };

  return (
    <>
      <div className="add-movie col-2">
        <button
          className="btn btn-add-movie"
          onClick={handleShowAddMovieWindow}
        >
          +Add Movie
        </button>
      </div>
      <div className="add-movie col-2">
        <button
          className="btn btn-add-movie"
          onClick={handleShowDeleteMovieWindow}
        >
          +Delete Movie
        </button>
      </div>
      <div className="add-movie col-2">
        <button
          className="btn btn-add-movie"
          onClick={handleShowHideMovieInfoWindow}
        >
          +Show Movie
        </button>
      </div>
      <AddMovieWindow
        clasificationMovies={clasificationTypes}
        showModal={showAddMovieModal}
        movie={movie}
        onHandleShowAddMovieWindow={handleShowAddMovieWindow}
      />

      <DeleteMovieWindow
        movieId="movie-1"
        showDeleteMovieModal={showDeleteMovieModal}
        onHandleShowDeleteMovieWindow={handleShowDeleteMovieWindow}
      />

      <MovieInfo
        movie={movie}
        showModal={showMovieInfoMovieModal}
        onHandleShowHideMovieInfoWindow={handleShowHideMovieInfoWindow}
      />
    </>
  );
};

export { AddMovie };
