import * as React from "react";
import "./AddMovie.scss";
import { AddMovieWindow } from "../AddMovieWindow/AddMovieWindow";
import { MovieInfo } from "../MovieInfo/MovieInfo";
import clasificationTypes from "../../data/clasifications.json";
import { IMovieData } from "../../interfaces/IMovieData";
import { IClasification } from "../../interfaces/IClasificationMovie";
import { Action } from "redux";

import { RootState } from "../../store/index";
import { connect, ConnectedProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { saveMovie } from "./thunks";

const mapState = (state: RootState) => ({
  movie: state.movie.movie,
});

const mapDispatch = (dispatch: ThunkDispatch<RootState, void, Action>) => {
  return {
    addNewMovie: (movie: IMovieData) => dispatch(saveMovie(movie)),
  };
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const AddMovie: React.FunctionComponent<Props> = ({ movie, addNewMovie }) => {
  const [showAddMovieModal, setShowAddMovieModal] = React.useState<boolean>(
    false
  );
  const [showDeleteMovieModal, setShowDeleteMovieModal] = React.useState<
    boolean
  >(false);
  const [showMovieInfoMovieModal, setShowMovieInfoModal] = React.useState<
    boolean
  >(false);
  const [movieTypes, setClasificationTypes] = React.useState<IClasification[]>(
    clasificationTypes
  );

  const handleShowAddMovieWindow = React.useCallback(() => {
    setShowAddMovieModal(!showAddMovieModal);
  }, [showAddMovieModal]);

  const handleShowDeleteMovieWindow = React.useCallback(() => {
    setShowDeleteMovieModal(!showDeleteMovieModal);
  }, [showDeleteMovieModal]);

  const handleShowHideMovieInfoWindow = React.useCallback(() => {
    setShowMovieInfoModal(!showMovieInfoMovieModal);
  }, [showMovieInfoMovieModal]);

  const handleSubmitAddMovie = function (movie: IMovieData) {
    addNewMovie(movie);
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
        clasificationMovies={movieTypes}
        showModal={showAddMovieModal}
        movie={movie}
        onHandleShowAddMovieWindow={handleShowAddMovieWindow}
        onHandleAddMovieSubmit={handleSubmitAddMovie}
      />

      {/* <MovieInfo
        movie={movie}
        showModal={showMovieInfoMovieModal}
        onHandleShowHideMovieInfoWindow={handleShowHideMovieInfoWindow}
      /> */}
    </>
  );
};

export default connector(AddMovie);
