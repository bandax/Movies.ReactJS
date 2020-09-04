import * as React from "react";
import "./AddMovie.scss";
import { AddMovieWindow } from "../AddMovieWindow/AddMovieWindow";
import { DeleteMovieWindow } from "../DeleteMovie/DeleteMovie";
import clasificationTypes from "../../data/clasifications.json";
import { IMovie } from "../../interfaces/IResultsMovies";

const movie: IMovie = {
  id: "movie-1",
  title: "Avengers Infinity War",
  image: "../../../assets/posters/avengers-infinity-war.PNG",
  year: 2004,
  releaseDate: "01/02/2014",
  review: "Testing review",
  url: "http://movie.com",
  runtime: "Runtime",
  categories: [
    {
      id: "cat-1",
      name: "Action & Adventure",
    },
  ],
};

type AddMovieState = {
  showModal: boolean;
  showDeleteMovieModal: boolean;
  title: string;
  releaseDate: Date;
  overview: string;
  url: string;
  genre: string;
  runtime: string;
};

class AddMovie extends React.Component<{}, AddMovieState> {
  state = {
    showModal: false,
    showDeleteMovieModal: false,
    title: "",
    releaseDate: new Date(),
    overview: "",
    url: "",
    genre: "",
    runtime: "",
  };

  handleShowAddMovieWindow = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleShowDeleteMovieWindow = (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>
  ) => {
    this.setState({
      showDeleteMovieModal: !this.state.showDeleteMovieModal,
    });
  };

  render() {
    return (
      <>
        <div className="add-movie col-2">
          <button
            className="btn btn-add-movie"
            onClick={this.handleShowAddMovieWindow}
          >
            +Add Movie
          </button>
        </div>
        <div className="add-movie col-2">
          <button
            className="btn btn-add-movie"
            onClick={this.handleShowDeleteMovieWindow}
          >
            +Delete Movie
          </button>
        </div>
        <AddMovieWindow
          clasificationMovies={clasificationTypes}
          showModal={this.state.showModal}
          movie={null}
          onHandleShowAddMovieWindow={this.handleShowAddMovieWindow}
        />

        <DeleteMovieWindow
          movieId="movie-1"
          showDeleteMovieModal={this.state.showDeleteMovieModal}
          onHandleShowDeleteMovieWindow={this.handleShowDeleteMovieWindow}
        />
      </>
    );
  }
}

export { AddMovie };
