import * as React from "react";
import "./ResultsMovie.scss";
import { IMovieData } from "../../interfaces/IMovieData";
import { DetailsMovie } from "../DetailsMovie/DetailsMovie";
import { connect } from "react-redux";
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

const mapStateToProps = (state: RootState) => ({
  movie: state.movie.movie,
  movies: getMoviesData(state),
  isLoading: getMoviesLoading(state),
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  return {
    startLoadingMovies: () => dispatch(loadMovies()),
    updateMovie: (movie: IMovieData) => dispatch(saveMovie(movie)),
    selectMovie: (movie: IMovieData) => dispatch(selectedMovie(movie)),
    deleteMovie: (id: number) => dispatch(deleteSelectedMovie(id)),
  };
};

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

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

  const handleEditMovie = function (movie: IMovieData) {
    setShowAddMovieModal(!showAddMovieModal);
    selectMovie(movie);
  };

  const handleDeleteMovie = function (movie: IMovieData) {
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
        onShowAddMovieWindow={handleShowAddMovieWindow}
        onAddMovieSubmit={handleUpdateMovie}
      />
      <DeleteMovieWindow
        movieId={movie?.id}
        showDeleteMovieModal={showDeleteMovieModal}
        onShowDeleteMovieWindow={handleShowDeleteMovieWindow}
        onConfirmDeleteMovie={handleDeleteSelectedMovie}
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
              onEditMovie={handleEditMovie}
              onDeleteMovie={handleDeleteMovie}
            />
          ))}
        </div>
      </div>
    </>
  );

  return isLoading ? loadingMessage : content;
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsMovie);
