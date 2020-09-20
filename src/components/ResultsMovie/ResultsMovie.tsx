import * as React from "react";
import "./ResultsMovie.scss";
import { IMovieData } from "../../interfaces/IMovieData";
import { DetailsMovie } from "../DetailsMovie/DetailsMovie";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/index";
import { loadMovies } from "./thunks";
import { ThunkDispatch } from "redux-thunk";
import { getMoviesLoading, getMoviesData } from "./selectors";
import { Action } from "redux";
import {
  saveMovie,
  selectedMovie,
  deleteSelectedMovie,
} from "../AddMovie/thunks";
import { AddMovieWindow } from "../AddMovieWindow/AddMovieWindow";
import clasificationTypes from "../../data/clasifications.json";
import { IClasification } from "../../interfaces/IClasificationMovie";
import { DeleteMovieWindow } from "../DeleteMovie/DeleteMovie";

const mapState = (state: RootState) => ({
  movie: state.movie.movie,
  movies: getMoviesData(state),
  isLoading: getMoviesLoading(state),
});

const mapDispatch = (dispatch: ThunkDispatch<RootState, void, Action>) => {
  return {
    startLoadingMovies: () => dispatch(loadMovies()),
    updateMovie: (movie: IMovieData) => dispatch(saveMovie(movie)),
    selectMovie: (movie: IMovieData) => dispatch(selectedMovie(movie)),
    deleteMovie: (id: number) => dispatch(deleteSelectedMovie(id)),
  };
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const ResultsMovie: React.FunctionComponent<Props> = ({
  movie,
  movies,
  startLoadingMovies,
  updateMovie,
  selectMovie,
  deleteMovie,
  isLoading,
}) => {
  const [showAddMovieModal, setShowAddMovieModal] = React.useState<boolean>(
    false
  );

  const [showDeleteMovieModal, setShowDeleteMovieModal] = React.useState<
    boolean
  >(false);

  const handleShowDeleteMovieWindow = React.useCallback(() => {
    setShowDeleteMovieModal(!showDeleteMovieModal);
  }, [showDeleteMovieModal]);

  const [movieTypes, setClasificationTypes] = React.useState<IClasification[]>(
    clasificationTypes
  );

  const handleShowAddMovieWindow = React.useCallback(() => {
    setShowAddMovieModal(!showAddMovieModal);
  }, [showAddMovieModal]);

  React.useEffect(() => {
    startLoadingMovies();
  }, []);

  const loadingMessage = <div>Loading movies...</div>;
  console.log("Rendering movies");

  const handleEditMovie = function (movie: IMovieData) {
    console.log(movie);
    setShowAddMovieModal(!showAddMovieModal);
    selectMovie(movie);
  };

  const handleDeleteMovie = function (movie: IMovieData) {
    console.log(movie);
    setShowDeleteMovieModal(!showDeleteMovieModal);
    selectMovie(movie);
  };

  const handleUpdateMovie = function (movie: IMovieData) {
    updateMovie(movie);
  };

  const handleDeleteSelectedMovie = function (id: number) {
    deleteMovie(id);
  };

  const content = (
    <>
      <AddMovieWindow
        clasificationMovies={movieTypes}
        showModal={showAddMovieModal}
        movie={movie}
        onHandleShowAddMovieWindow={handleShowAddMovieWindow}
        onHandleAddMovieSubmit={handleUpdateMovie}
      />
      <DeleteMovieWindow
        movieId={movie?.id}
        showDeleteMovieModal={showDeleteMovieModal}
        onHandleShowDeleteMovieWindow={handleShowDeleteMovieWindow}
        onHandleConfirmDeleteMovie={handleDeleteSelectedMovie}
      />
      <div className="list-movies">
        <div className="total-result">
          <span className="found-label">
            <b>{movies.length}</b> movies found
          </span>
        </div>
        <div className="display-movie">
          {movies.map((movie: IMovieData) => (
            <DetailsMovie
              key={movie.id}
              movie={movie}
              onHandleEditMovie={handleEditMovie}
              onHandleDeleteMovie={handleDeleteMovie}
            />
          ))}
        </div>
      </div>
    </>
  );

  return isLoading ? loadingMessage : content;
};

export default connector(ResultsMovie);
